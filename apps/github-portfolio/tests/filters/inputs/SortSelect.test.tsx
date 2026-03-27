import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { SortSelect } from "@/components/filters/inputs/SortSelect";

describe("SortSelect", () => {
  it("renders", () => {
    const { container } = render(<SortSelect value="stars_desc" onChange={() => {}} />);
    expect(container.querySelector("select")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    const { container } = render(<SortSelect value="stars_desc" onChange={onChange} />);
    fireEvent.change(container.querySelector("select")!, { target: { value: "name_asc" } });
    expect(onChange).toHaveBeenCalledWith("name_asc");
  });

  it("shows title attribute", () => {
    const { container } = render(<SortSelect value="stars_desc" onChange={() => {}} />);
    expect(container.querySelector("select[title='Most Stars']")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<SortSelect value="stars_desc" onChange={() => {}} className="test" />);
    expect(container.querySelector(".test")).toBeInTheDocument();
  });

  it("shows all sort options", () => {
    const { container } = render(<SortSelect value="stars_desc" onChange={() => {}} />);
    expect(container.querySelector("option[value='stars_desc']")).toBeInTheDocument();
    expect(container.querySelector("option[value='stars_asc']")).toBeInTheDocument();
    expect(container.querySelector("option[value='name_asc']")).toBeInTheDocument();
    expect(container.querySelector("option[value='name_desc']")).toBeInTheDocument();
  });
});
