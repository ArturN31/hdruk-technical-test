import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { LanguageFilter } from "@/components/filters/LanguageFilter";

describe("LanguageFilter", () => {
  it("renders null for empty", () => {
    const { container } = render(<LanguageFilter languages={[]} value="all" onChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders select", () => {
    const { container } = render(<LanguageFilter languages={["TS"]} value="all" onChange={() => {}} />);
    expect(container.querySelector("select")).toBeInTheDocument();
  });
});
