AI was used for three main areas: (1) rapid architectural scaffolding (hook/container/presentational split), (2) generating repetitive but typed UI states and test fixtures, and (3) creating first-pass documentation and QA checklists.
Prompts that worked best were highly constrained prompts that specified exact behavior boundaries, such as "URL search triggers fetch; repo filter must be local-only with no network calls" and "pure components receive only props."
A prompt pattern that consistently improved output quality was requesting explicit acceptance criteria plus verification commands (`lint`, `test`, `build`) in the same instruction.
One notable correction: an earlier model output enforced strict schema parsing against GitHub's full repository payload, which caused `502` validation errors; this was corrected by switching to `.passthrough()` while still validating required fields.
Another correction was removing implicit default sorting assumptions and replacing them with explicit user-selected sorting controls to align product requirements and usability expectations.

## Production Readiness Improvements

AI was instrumental in implementing comprehensive production readiness features including rate limiting, security headers, input validation, error boundaries, and Web Vitals monitoring. The model correctly generated the rate limiting logic with IP tracking, but I had to correct the initial implementation to use a sliding window approach instead of a fixed window to better handle burst traffic patterns. The AI also successfully created the security headers configuration and error boundary components on the first attempt, demonstrating strong understanding of Next.js best practices.

