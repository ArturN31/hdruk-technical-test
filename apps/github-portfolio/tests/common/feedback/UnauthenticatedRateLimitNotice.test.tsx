import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UnauthenticatedRateLimitNotice } from "@/components/common/feedback/UnauthenticatedRateLimitNotice";

describe("UnauthenticatedRateLimitNotice", () => {
  it("renders rate limit information", () => {
    render(<UnauthenticatedRateLimitNotice />);
    expect(screen.getByText(/60 requests/i)).toBeInTheDocument();
  });
});
