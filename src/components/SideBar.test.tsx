import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "./SideBar";

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("SideBar", () => {
  it("renders navigation links", () => {
    render(<SideBar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  it("collapses on mobile", () => {
    render(<SideBar isMobile />);
    expect(screen.getByRole("complementary")).toHaveClass("hidden");
  });
});
