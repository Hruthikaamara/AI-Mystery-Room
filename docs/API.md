# Investigation API contract

Base URL: `/api`. JSON request and response bodies. The solution is excluded from all public endpoints until the verdict endpoint succeeds.

## Generate — `POST /investigations/generate`

Request: `{ "scenario": "...", "title": "...", "category": "...", "difficulty": "Standard", "instructions": "..." }`

Success `201`: `{ "success": true, "investigationId": "...", "message": "...", "generationStatus": "complete" }`.

## Read — `GET /investigations/:id`

Returns the spoiler-safe title, case summary, location/date, timeline and status. It omits original prompt, suspects, and solution.

## Suspects — `GET /investigations/:id/suspects`

Returns `{ "suspects": [...] }` without a culprit field.

## Evidence — `GET /investigations/:id/evidence`

Returns `{ "evidence": [...] }`. Solution and reasoning are omitted.

## Verdict — `POST /investigations/:id/verdict`

Request: `{ "selectedSuspectId": "S1" }`. A valid first submission returns the result payload with correctness and the actual culprit, motive, explanation, and decisive exhibits. Further submissions return `409`.

## Result — `GET /investigations/:id/result`

Returns the same result payload after submission; returns `403` before verdict submission.

## Health — `GET /health`

Returns `{ "status": "ok" }` when the API process is running. Database connection is required before the API starts.
