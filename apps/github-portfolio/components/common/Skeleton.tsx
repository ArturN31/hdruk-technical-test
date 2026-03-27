import * as React from "react";

export interface SkeletonProps {
  className?: string;
  "data-testid"?: string;
}

export function Skeleton({ className = "", "data-testid": dataTestId }: SkeletonProps) {
  return (
    <div
      className={["animate-pulse rounded bg-gray-200", className].join(" ")}
      aria-hidden="true"
      data-testid={dataTestId}
    />
  );
}
