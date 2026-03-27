import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Providers } from "@/app/providers";

describe("Providers", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("provides React Query context", () => {
    const TestComponent = () => <div>Test</div>;
    
    const { getByText } = render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });
});
