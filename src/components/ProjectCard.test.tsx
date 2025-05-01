import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

describe("ProjectCard", () => {
  it("renders project title and description", () => {
    const testProject = {
      title: "Test Project",
      description: "Test Description",
    };

    render(<ProjectCard {...testProject} />);

    expect(screen.getByText(testProject.title)).toBeInTheDocument();
    expect(screen.getByText(testProject.description)).toBeInTheDocument();
  });

  it("has proper styling classes", () => {
    render(<ProjectCard title="Test" description="Test" />);
    const card = screen.getByRole("article");

    expect(card).toHaveClass("border");
    expect(card).toHaveClass("rounded-lg");
    expect(card).toHaveClass("shadow-sm");
  });
});
