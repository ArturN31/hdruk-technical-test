import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingState } from "@/components/repository/states/LoadingState";

describe("LoadingState", () => {
  it("renders loading skeleton", () => {
    render(<LoadingState />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
