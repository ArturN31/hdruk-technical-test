import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SearchInput } from "@/components/filters/inputs/SearchInput";

describe("SearchInput", () => {
  it("renders", () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} repositories={[]} />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });
});
