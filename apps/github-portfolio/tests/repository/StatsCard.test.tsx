import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "@/components/repository/StatsCard";

describe("StatsCard", () => {
  it("renders null when loading", () => {
    const { container } = render(<StatsCard displayedCount={0} filteredCount={0} totalStars={0} uniqueLanguages={[]} isLoading />);
    expect(container.firstChild).toBeNull();
  });

  it("renders overview heading", () => {
    render(<StatsCard displayedCount={10} filteredCount={20} totalStars={100} uniqueLanguages={[]} isLoading={false} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders total stars", () => {
    render(<StatsCard displayedCount={10} filteredCount={20} totalStars={1000} uniqueLanguages={[]} isLoading={false} />);
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });
});
