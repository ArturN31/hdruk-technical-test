import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SortSelect } from "@/components/filters/inputs/SortSelect";

describe("SortSelect", () => {
  it("renders", () => {
    const { container } = render(<SortSelect value="stars_desc" onChange={() => {}} />);
    expect(container.querySelector("select")).toBeInTheDocument();
  });
});
