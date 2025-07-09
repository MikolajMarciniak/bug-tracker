import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectList from "./ProjectsList";
import { mockProjects } from "@/lib/mockData";

describe("ProjectList", () => {
  it("renders correct number of projects", () => {
    render(<ProjectList projects={mockProjects} />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(mockProjects.length);
  });

  it("displays empty state when no projects", () => {
    render(<ProjectList projects={[]} />);
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
  });
});
