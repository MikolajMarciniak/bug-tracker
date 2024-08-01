import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import "@testing-library/jest-dom";

describe("Sidebar Component", () => {
  test("renders Sidebar component", () => {
    render(<Sidebar />);
    // Check if the sidebar is rendered
    const sidebar = screen.getByRole("banner");
    expect(sidebar).toBeInTheDocument();
  });

  test("contains Dashboard link", () => {
    render(<Sidebar />);
    // Check if the Dashboard link is present
    const dashboardLink = screen.getByText(/dashboard/i);
    expect(dashboardLink).toBeInTheDocument();
  });

  test("contains Login link", () => {
    render(<Sidebar />);
    // Check if the Login link is present
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
  });
});
