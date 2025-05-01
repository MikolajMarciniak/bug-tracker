import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./page";

jest.mock("@/components/ProjectsList", () => {
  return function MockProjectsList() {
    return <ul aria-label="Projects List">Mock Projects List</ul>;
  };
});

describe("Dashboard Page", () => {
  it("displays the main heading", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });

  it("renders project list with mock data", () => {
    render(<Dashboard />);
    expect(screen.getByRole("list", { name: /projects list/i })).toBeInTheDocument();
  });
});
