import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "@/components/repository/states/ErrorState";

describe("ErrorState", () => {
  it("renders user not found error", () => {
    render(<ErrorState errorCode="USER_NOT_FOUND" errorMessage="User not found" onRetry={() => {}} />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders retry button", () => {
    const { container } = render(<ErrorState errorCode="USER_NOT_FOUND" errorMessage="Error" onRetry={() => {}} />);
    expect(container.textContent).toMatch(/Try Again/);
  });

  it("renders rate limit notice for RATE_LIMITED", () => {
    const { container } = render(<ErrorState errorCode="RATE_LIMITED" errorMessage="Error" onRetry={() => {}} />);
    expect(container.textContent).toMatch(/60 requests/i);
  });

  it("renders rate limit notice for UPSTREAM_ERROR", () => {
    const { container } = render(<ErrorState errorCode="UPSTREAM_ERROR" errorMessage="Error" onRetry={() => {}} />);
    expect(container.textContent).toMatch(/60 requests/i);
  });
});
