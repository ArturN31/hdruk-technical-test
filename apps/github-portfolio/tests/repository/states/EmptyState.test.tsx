import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/repository/states/EmptyState";

describe("EmptyState", () => {
  it("renders empty state heading", () => {
    render(<EmptyState onClearFilters={() => {}} />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
