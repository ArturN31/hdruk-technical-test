import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RepositoryGridSkeleton } from "@/components/repository/states/RepositoryGridSkeleton";

describe("RepositoryGridSkeleton", () => {
  it("renders grid with default count", () => {
    const { container } = render(<RepositoryGridSkeleton />);
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(1);
  });

  it("renders grid with custom count", () => {
    const { container } = render(<RepositoryGridSkeleton count={3} />);
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(1);
  });
});
