import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TypeFilters } from "@/components/filters/inputs/TypeFilters";

describe("TypeFilters", () => {
  it("renders", () => {
    const { container } = render(<TypeFilters value="all" onChange={() => {}} />);
    expect(container.querySelector("button")).toBeInTheDocument();
  });
});
