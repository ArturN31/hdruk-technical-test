import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "@/components/common/SkipLink";

describe("SkipLink", () => {
  it("renders skip link", () => {
    render(<SkipLink />);
    const links = screen.getAllByText("Skip to main content");
    expect(links[0]).toBeInTheDocument();
  });

  it("has correct href", () => {
    render(<SkipLink />);
    const links = screen.getAllByText("Skip to main content");
    expect(links[0]).toHaveAttribute("href", "#main-content");
  });

  it("has sr-only class", () => {
    const { container } = render(<SkipLink />);
    expect(container.firstChild).toHaveClass("sr-only");
  });

  it("has focus:not-sr-only class", () => {
    const { container } = render(<SkipLink />);
    expect(container.firstChild).toHaveClass("focus:not-sr-only");
  });
});
