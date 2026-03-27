import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/common/SectionHeading";

describe("SectionHeading", () => {
  it("renders title", () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    expect(container.textContent).not.toMatch(/Test Subtitle/);
  });
});
