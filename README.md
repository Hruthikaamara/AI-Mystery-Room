# The Casefile — AI Mystery Room

A MERN mystery investigation game. Create a case from a scenario, examine the fictional evidence, and submit a final verdict. The culprit and solution are stored only in the MongoDB record and are omitted from public case, suspect, and evidence API responses until a verdict is submitted.

## Requirements

- Node.js 20 or newer and npm
- MongoDB (local or hosted)
- A Google Gemini API key

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and `GEMINI_API_KEY`. `GEMINI_MODEL` defaults to `gemini-2.0-flash`.
2. From the repository root, install dependencies with `npm install`.
3. Start the API and Vite development server with `npm run dev`.
4. Open `http://localhost:5173`.

The API listens on port 5000 by default. Change `CLIENT_URL` when the client uses a different origin. To host the client separately, set `VITE_API_BASE_URL` to the API base URL (for example, `https://api.example.com/api`) in the client environment at build time.

## API

All routes are under `/api`:

- `POST /investigations/generate` — Generate and persist a case from `{ scenario, title?, category?, difficulty?, instructions? }`.
- `GET /investigations/:id` — Spoiler-safe case overview.
- `GET /investigations/:id/suspects` — Suspect profiles without culprit information.
- `GET /investigations/:id/evidence` — Evidence viewers' data.
- `POST /investigations/:id/verdict` — Submit `{ selectedSuspectId }` once.
- `GET /investigations/:id/result` — Reveal the solution after submission.
- `GET /health` — API health.

Case generation is limited to 8 requests per IP per hour. Generation fails clearly if Gemini or MongoDB is not configured or a returned mystery fails schema and clue-reference validation. This avoids substituting fixed stories for dynamic Gemini-generated investigations.

## Media and privacy

Message threads, photographs, witness material, and CCTV sequences are generated fictional content. Gemini text generation does not itself create images or video. The first release uses a replaceable media-service boundary and clearly labelled in-app scene reconstructions and CCTV playback when an external media provider is not configured; no real hosted media is implied. Gemini credentials are read only by the server. Do not commit `.env` files.

## Project layout

- `client/` — React, Vite, React Router, API client, evidence viewers, and responsive interface.
- `server/` — Express routes/controllers, Gemini prompt/service, Mongoose model, validation, and verdict handling.
- `spec.md` — Project source specification.

## Current scope

The MVP implements the single-session case workflow without accounts. Investigation IDs are shareable, and cases persist in MongoDB. Evidence view progress is stored in the current browser session. There is no user authentication or external object-storage upload adapter configured yet; generated content uses text and clearly marked UI simulations unless media storage/provider credentials are added.
