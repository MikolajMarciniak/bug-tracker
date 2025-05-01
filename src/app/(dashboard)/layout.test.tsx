import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardLayout from "./layout";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      // Add other router methods you use
    };
  },
}));

describe("DashboardLayout", () => {
  it("renders sidebar and main content", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct layout classes", () => {
    render(
      <DashboardLayout>
        <div />
      </DashboardLayout>
    );
    const container = screen.getByTestId("dashboard-layout");

    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("min-h-screen");
  });
});
