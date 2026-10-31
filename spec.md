# AI MYSTERY ROOM
## Software Specification Sheet (SSOT)

**Document Version:** 1.0  
**Project Type:** AI-Powered Interactive Mystery Investigation Web Application  
**Development Approach:** Spec-Driven Development  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Integration:** Google Gemini API  

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery investigation platform where users can create and solve fictional crime and mystery cases.

Users provide a short story, scenario, or mystery idea. Based on their input, the AI generates a complete fictional investigation containing:

- A mystery scenario.
- A list of suspects.
- A hidden culprit.
- Motives and backgrounds.
- Evidence and clues.
- Simulated WhatsApp conversations.
- AI-generated photographs.
- Simulated CCTV recordings.
- Witness statements.
- Investigation reports.

The user investigates the case by examining the available evidence, connecting clues, and identifying the culprit.

At the end of the investigation, the user selects a suspect as the culprit and submits their final answer.

The system evaluates the answer against the original AI-generated solution and displays the investigation outcome, explanation, and relevant evidence.

## 1.2 Main Objective

To create an immersive, interactive mystery-solving experience using generative AI, where every investigation is dynamically generated instead of relying on predefined mystery stories.

## 1.3 Core Concept

**User Input → AI Mystery Generation → Investigation Room → Evidence Analysis → Culprit Selection → Final Verdict**

## 1.4 Target Users

- Mystery and detective story enthusiasts.
- Students interested in problem-solving.
- Casual gamers.
- Users interested in AI-generated interactive experiences.

## 1.5 Project Scope

The first version will support:

1. Creating mysteries from user-provided scenarios.
2. Generating fictional investigations using Gemini.
3. Generating multiple suspects with different backgrounds.
4. Generating different types of evidence.
5. Displaying evidence in an interactive investigation interface.
6. Allowing users to investigate and identify the culprit.
7. Evaluating the user's final answer.
8. Displaying investigation results and explanations.

---

# 2. USER WORKFLOW

## 2.1 Complete Application Flow

### Step 1: Landing Page

The user visits the website and sees:

- Application name: AI Mystery Room.
- Short description of the platform.
- Start Investigation button.
- How It Works section.
- A visually engaging mystery/detective-themed interface.

### Step 2: Create a Mystery

The user clicks Start Investigation.

The application opens a mystery creation page.

The user provides:

- Mystery title (optional).
- Scenario or story description.
- Mystery category (optional).
- Difficulty level.
- Additional instructions (optional).

Example user input:

"A businessman was found unconscious in his locked office at midnight. Three employees had access to his office, and one of them is hiding something."

The user clicks Generate Mystery.

### Step 3: AI Investigation Generation

The backend sends the user's scenario to Gemini.

Gemini generates a structured investigation containing:

- Case description.
- Crime or mystery details.
- Suspects.
- Actual culprit.
- Motive.
- Timeline.
- Evidence.
- Witness statements.
- Evidence relationships.
- Correct solution and explanation.

The application validates the generated investigation before saving it.

The user is then redirected to the Investigation Room.

### Step 4: Investigation Room

The investigation room is the main gameplay interface.

The user can explore:

**A. Case Overview**
- Case title.
- Case summary.
- Incident location.
- Incident date and time.
- Investigation status.

**B. Suspects**
- Suspect photographs or avatars.
- Names.
- Age.
- Occupation.
- Background.
- Relationship to the victim.
- Initial statements.

**C. Evidence Room**

The user receives multiple pieces of evidence.

Evidence categories:

1. WhatsApp Messages
   - Simulated conversations.
   - Sender and receiver information.
   - Timestamps.
   - Message content.
   - Relevant suspicious conversations.

2. Photographs
   - AI-generated crime-scene photographs.
   - Objects found at the location.
   - Relevant environmental details.
   - Visual clues.

3. CCTV Recordings
   - Simulated surveillance footage.
   - Timestamp information.
   - People entering or leaving locations.
   - Suspicious movements.

4. Witness Statements
   - Statements from witnesses.
   - Different perspectives.
   - Contradictions and inconsistencies.

5. Investigation Documents
   - Police reports.
   - Incident reports.
   - Other relevant fictional documents.

### Step 5: Analyze Evidence

Users can:

- Open individual evidence items.
- Zoom into photographs.
- Read message conversations.
- Play available CCTV simulations.
- Review witness statements.
- Revisit suspect profiles.
- Compare evidence across the investigation.

Evidence must remain accessible throughout the investigation.

### Step 6: Identify the Culprit

The user opens the Final Verdict section.

The application displays all suspects.

The user selects one suspect and clicks Submit Verdict.

The selected suspect is compared with the actual culprit stored in the database.

### Step 7: Investigation Results

The result screen displays:

- Selected suspect.
- Actual culprit.
- Correct or incorrect verdict.
- Explanation of the culprit's motive.
- Important clues that reveal the culprit.
- Evidence connecting the culprit to the mystery.
- Final investigation summary.

The user can also choose to start a new investigation.

---

# 3. FUNCTIONAL REQUIREMENTS

## FR-01: Mystery Creation

The application must allow users to create a mystery using a text-based scenario.

Requirements:
- Accept user-provided text.
- Validate that the scenario is not empty.
- Allow optional mystery title.
- Support difficulty selection.
- Support mystery category selection.
- Provide a Generate Mystery button.
- Display loading and generation status.

## FR-02: AI Mystery Generation

The backend must use Google Gemini to generate a complete fictional mystery.

The AI must generate:
- Case information.
- Suspects.
- Culprit.
- Motive.
- Timeline.
- Evidence.
- Witness statements.
- Clue relationships.
- Final solution.

The generated mystery must follow a consistent logical structure.

The culprit must be predetermined during case generation and must not change during gameplay.

## FR-03: Suspect Generation

Each investigation must contain 3–5 suspects.

Every suspect must have:
- Unique ID.
- Full name.
- Age.
- Occupation.
- Photograph or avatar.
- Background.
- Relationship with the victim or incident.
- Possible motive.
- Alibi.
- Initial statement.

The culprit must be one of the generated suspects.

All suspects must have believable backgrounds.

## FR-04: Evidence Generation

Each investigation must contain multiple evidence items.

Minimum evidence requirements:

- At least 2 WhatsApp conversation records.
- At least 2 photographs.
- At least 1 CCTV recording or simulated CCTV sequence.
- At least 2 witness statements.
- At least 1 investigation document.

Each evidence item must have:
- Unique ID.
- Evidence title.
- Evidence type.
- Description.
- Content or media reference.
- Timestamp.
- Associated suspect IDs, if applicable.
- Clue significance.

Not every evidence item should directly reveal the culprit.

Some evidence must be misleading but logically explainable.

## FR-05: Evidence Viewing

Users must be able to open and inspect every available evidence item.

The application must support different viewing interfaces based on evidence type.

## FR-06: Culprit Selection

The user must select one suspect as the culprit.

Requirements:
- Display all suspects.
- Allow only one final selection.
- Require confirmation before submission.
- Prevent duplicate final submissions.
- Compare the submitted suspect ID with the stored culprit ID.

## FR-07: Result Evaluation

After submission:
- Reveal whether the verdict is correct.
- Reveal the actual culprit.
- Display the motive.
- Explain the important clues.
- Connect evidence to the final explanation.

The answer must be evaluated against the original stored investigation, not a newly generated AI answer.

## FR-08: Investigation Persistence

The application must save generated investigations in MongoDB.

Users should be able to continue an existing investigation after refreshing the page.

---

# 4. AI INTEGRATION SPECIFICATION

## 4.1 AI Provider

Primary AI provider: Google Gemini API.

Gemini will be responsible for generating the mystery content and structured investigation data.

The API key must be stored securely in the backend environment variables.

The frontend must never directly access the Gemini API key.

## 4.2 AI Generation Pipeline

The generation pipeline must follow this sequence:

1. Receive the user's scenario.
2. Validate user input.
3. Send a structured prompt to Gemini.
4. Request structured JSON output.
5. Parse the AI response.
6. Validate the generated JSON against the application schema.
7. Check suspect and culprit consistency.
8. Check that the evidence supports the final solution.
9. Generate or request supporting media.
10. Save the completed investigation in MongoDB.
11. Return the investigation ID to the frontend.

## 4.3 AI Mystery Generation Rules

The AI must follow these rules:

- Every investigation must have exactly one actual culprit.
- The culprit must be one of the suspects.
- All suspects must have plausible motives or reasons for suspicion.
- The evidence must support the final solution.
- The investigation must have a consistent timeline.
- Evidence timestamps must not contradict the timeline.
- The culprit must not be revealed before the user submits a verdict.
- Red herrings must not make the final solution logically impossible.
- The final explanation must reference actual evidence IDs.
- The generated content must remain fictional.

## 4.4 Structured AI Output

Gemini must return structured JSON.

The output must contain these main objects:

- case
- suspects
- evidence
- timeline
- solution

The solution object must contain:
- culpritId
- motive
- explanation
- decisiveEvidenceIds

The solution object must be stored separately from publicly accessible investigation data.

## 4.5 AI Media Generation

AI-generated evidence must be handled through a media generation layer.

**Images:**
- Generate fictional suspect portraits where appropriate.
- Generate crime-scene images.
- Generate relevant object photographs.

**WhatsApp Conversations:**
- Generate realistic fictional message content.
- Render the conversations using a WhatsApp-inspired interface.
- Clearly identify the content as simulated.

**CCTV Recordings:**
- Generate simulated surveillance scenes.
- Include timestamps and relevant movements.
- Support video playback where actual video assets are available.
- If video generation is unavailable, use a sequence of AI-generated frames with timestamps and simulated playback.

Important: Gemini is the primary reasoning and content-generation provider. Image and video generation capabilities must be implemented through compatible Google media models or a replaceable media-provider adapter. Do not assume that a text-generation API can directly generate video.

---

# 5. TECHNICAL STACK

## 5.1 Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios or Fetch API
- Lucide React icons

Frontend responsibilities:
- Display the user interface.
- Collect scenario input.
- Display generated mysteries.
- Display suspects and evidence.
- Handle evidence interactions.
- Submit final verdicts.
- Display results.

## 5.2 Backend

- Node.js
- Express.js

Backend responsibilities:
- Handle API requests.
- Validate user inputs.
- Communicate with Gemini.
- Manage AI generation.
- Validate AI responses.
- Manage evidence and media references.
- Save and retrieve investigations.
- Evaluate final verdicts.

## 5.3 Database

MongoDB with Mongoose.

Main collections:

1. Investigations
2. Users (optional for MVP if authentication is introduced)
3. InvestigationAttempts (optional; use if multiple attempts or score history are supported)

## 5.4 AI Integration

- Google Gemini API.
- Structured JSON generation.
- Prompt templates.
- Response validation.
- Media generation adapter.

## 5.5 Media Storage

Use external object storage for generated images and videos.

Store media URLs and metadata in MongoDB.

Do not store large media files directly inside investigation documents.

---

# 6. DATABASE DESIGN

## 6.1 Investigation Collection

Fields:

- _id
- title
- originalScenario
- category
- difficulty
- caseDescription
- incidentLocation
- incidentDate
- suspects
- evidence
- timeline
- solution
- status
- createdAt
- updatedAt

## 6.2 Suspects Schema

- suspectId
- name
- age
- occupation
- imageUrl
- background
- relationshipToIncident
- motive
- alibi
- statement

## 6.3 Evidence Schema

- evidenceId
- title
- type
- description
- content
- mediaUrl
- timestamp
- associatedSuspectIds
- clueSignificance
- metadata

Evidence types:

- WHATSAPP
- IMAGE
- CCTV
- WITNESS_STATEMENT
- DOCUMENT

## 6.4 Solution Schema

- culpritId
- motive
- explanation
- decisiveEvidenceIds
- reasoning

The solution must never be returned through public investigation API responses before verdict submission.

## 6.5 Investigation Attempts

- _id
- investigationId
- selectedSuspectId
- isCorrect
- submittedAt

For MVP, one final submission per investigation session is sufficient.

---

# 7. BACKEND API SPECIFICATION

Base URL: `/api`

## 7.1 Generate Investigation

**POST** `/api/investigations/generate`

Request:

- scenario
- title (optional)
- category
- difficulty

Response:

- success
- investigationId
- message
- generationStatus

## 7.2 Get Investigation

**GET** `/api/investigations/:id`

Returns:
- Case overview.
- Suspects.
- Evidence metadata.
- Timeline.
- Investigation status.

Must exclude the actual solution.

## 7.3 Get Evidence

**GET** `/api/investigations/:id/evidence`

Returns evidence available to the user.

## 7.4 Get Suspects

**GET** `/api/investigations/:id/suspects`

Returns suspect information without exposing the culprit.

## 7.5 Submit Verdict

**POST** `/api/investigations/:id/verdict`

Request:

- selectedSuspectId

Response:

- isCorrect
- actualCulprit
- motive
- explanation
- decisiveEvidence
- result

This endpoint is responsible for checking the answer and revealing the solution.

## 7.6 Get Investigation Result

**GET** `/api/investigations/:id/result`

Returns the result only if the verdict has already been submitted.

---

# 8. FRONTEND PAGE STRUCTURE

The application must contain the following pages:

## Page 1: Landing Page

Route: `/`

Sections:
- Navigation bar.
- Hero section.
- Application introduction.
- Start Investigation CTA.
- How It Works.
- Footer.

## Page 2: Create Mystery

Route: `/create`

Components:
- Scenario text area.
- Title input.
- Category selector.
- Difficulty selector.
- Generate button.
- Loading indicator.

## Page 3: Investigation Room

Route: `/investigation/:id`

Layout:

**Left Sidebar:**
- Case overview.
- Suspects.
- Evidence categories.
- Investigation navigation.

**Main Content:**
- Selected section.
- Suspect cards.
- Evidence viewer.
- Case information.

**Top Navigation:**
- Case title.
- Investigation status.
- Exit or back option.

## Page 4: Final Verdict

Route: `/investigation/:id/verdict`

Components:
- Suspect selection cards.
- Selected suspect confirmation.
- Submit verdict button.

## Page 5: Results

Route: `/investigation/:id/result`

Components:
- Verdict status.
- Actual culprit profile.
- Motive.
- Explanation.
- Decisive clues.
- Start New Investigation button.

---

# 9. UI/UX DESIGN SPECIFICATION

## 9.1 Design Theme

The application should have a professional detective-investigation atmosphere.

Visual direction:
- Dark mystery-themed interface.
- Charcoal and deep navy backgrounds.
- Muted grey surfaces.
- Burgundy or red accents.
- Warm amber highlights.
- Clear, readable typography.

## 9.2 Design Principles

- Modern and minimal.
- Immersive but not visually cluttered.
- Responsive across desktop, tablet and mobile.
- Clear navigation.
- Evidence should feel like real investigation material.
- Important information must be easy to locate.
- Avoid excessive animations.

## 9.3 Evidence UI

Each evidence type must have a dedicated viewer.

**WhatsApp:** Chat-style conversation interface.

**Photographs:** Image viewer with zoom capability and captions.

**CCTV:** Video player or simulated CCTV playback with timestamps.

**Witness Statements:** Document-style layout.

**Investigation Reports:** Formal report-style layout.

## 9.4 Interaction Design

- Hover states for clickable elements.
- Loading indicators during AI generation.
- Clear success and error messages.
- Confirmation before submitting the final verdict.
- Smooth page transitions.
- Evidence should be marked as viewed when opened.

---

# 10. SECURITY AND DATA PROTECTION

The application must follow these rules:

1. Gemini API keys must only exist on the backend.
2. Validate all incoming API requests.
3. Sanitize user-provided text.
4. Prevent MongoDB injection.
5. Add request rate limiting to AI generation endpoints.
6. Set reasonable input length limits.
7. Handle API failures safely.
8. Do not expose the culprit ID in public investigation responses.
9. Do not expose the solution through frontend state, HTML, or API payloads before submission.
10. Do not use real private conversations, surveillance footage, or personal information as generated evidence.

All AI-generated evidence must be identified as fictional or simulated.

---

# 11. ERROR HANDLING

The application must handle:

- Empty scenario submission.
- Invalid scenario input.
- Gemini API failure.
- Invalid AI JSON response.
- Incomplete investigation generation.
- Media generation failure.
- MongoDB connection failure.
- Investigation not found.
- Invalid suspect selection.
- Duplicate verdict submission.
- Network errors.

Display understandable error messages to the user.

Do not create a partially usable investigation if critical generation or validation fails.

If optional media generation fails, allow a clearly indicated text-based fallback where possible.

---

# 12. NON-FUNCTIONAL REQUIREMENTS

## Performance
- Avoid blocking the frontend during AI generation.
- Display generation progress.
- Load media on demand.
- Use pagination or lazy loading if evidence becomes large.

## Reliability
- Save completed investigations in MongoDB.
- Preserve the original culprit and solution.
- Validate AI-generated data before saving.
- Handle retryable generation failures.

## Scalability
- Keep AI generation logic separate from API controllers.
- Use reusable components.
- Use modular backend services.
- Keep media storage separate from the database.

## Maintainability
- Maintain a clear folder structure.
- Use reusable prompt templates.
- Keep database schemas consistent.
- Centralize error handling.
- Keep API contracts documented.

---

# 13. PROJECT FOLDER STRUCTURE

Recommended structure:

```text
ai-mystery-room/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── SuspectCard.jsx
│       │   ├── EvidenceCard.jsx
│       │   ├── WhatsAppViewer.jsx
│       │   ├── ImageViewer.jsx
│       │   ├── CCTVViewer.jsx
│       │   └── LoadingScreen.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── CreateMystery.jsx
│       │   ├── InvestigationRoom.jsx
│       │   ├── Verdict.jsx
│       │   └── Result.jsx
│       ├── services/
│       │   └── api.js
│       ├── hooks/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── mysteryService.js
│   │   ├── evidenceService.js
│   │   ├── mediaService.js
│   │   └── verdictService.js
│   ├── prompts/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── docs/
│   └── SPEC.md
│
├── .gitignore
└── README.md
```

---

# 14. ENVIRONMENT VARIABLES

Backend `.env`:

```env
PORT=5000
MONGODB_URI=
GEMINI_API_KEY=
GEMINI_MODEL=
MEDIA_PROVIDER=
MEDIA_STORAGE_URL=
MEDIA_STORAGE_KEY=
CLIENT_URL=
```

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Never commit `.env` files to GitHub.

---

# 15. MVP ACCEPTANCE CRITERIA

The first version will be considered complete when all the following conditions are met.

### Mystery Creation
- [ ] User can enter a custom scenario.
- [ ] User can select difficulty.
- [ ] User can generate a mystery successfully.
- [ ] Investigation is saved in MongoDB.

### AI Generation
- [ ] Gemini generates a valid investigation.
- [ ] Investigation contains 3–5 suspects.
- [ ] Exactly one suspect is the culprit.
- [ ] Evidence supports the final solution.
- [ ] Investigation timeline is consistent.

### Evidence Room
- [ ] WhatsApp conversations are displayed.
- [ ] AI-generated photographs are displayed.
- [ ] CCTV video or simulated footage is available.
- [ ] Witness statements are accessible.
- [ ] Users can revisit evidence.

### Verdict
- [ ] Users can select a suspect.
- [ ] Users can submit their final answer.
- [ ] Correct and incorrect answers are evaluated correctly.
- [ ] The actual solution is revealed after submission.

### Technical
- [ ] React frontend communicates with Express backend.
- [ ] Express backend communicates with MongoDB.
- [ ] Gemini integration works securely.
- [ ] The application handles API errors.
- [ ] No solution data leaks before verdict submission.
- [ ] Application works on desktop and mobile.

---

# 16. DEVELOPMENT PHASES

## Phase 1: Project Setup
- Initialize MERN project.
- Configure React and Express.
- Connect MongoDB.
- Set up environment variables.
- Configure frontend/backend communication.

## Phase 2: Frontend Development
- Build landing page.
- Build mystery creation form.
- Build investigation room.
- Build evidence viewers.
- Build verdict and results pages.

## Phase 3: Backend Development
- Create Express routes.
- Create Mongoose schemas.
- Implement investigation APIs.
- Implement evidence APIs.
- Implement verdict evaluation.

## Phase 4: Gemini Integration
- Configure Gemini API.
- Create mystery-generation prompts.
- Generate structured JSON.
- Validate AI responses.
- Save investigation data.

## Phase 5: Media Integration
- Generate photographs.
- Create WhatsApp-style evidence.
- Implement CCTV media or simulated footage.
- Integrate media storage.

## Phase 6: Testing
- Test complete user workflow.
- Test different scenarios.
- Test AI response consistency.
- Test culprit validation.
- Test API security.
- Test responsive UI.

## Phase 7: Deployment
- Deploy frontend.
- Deploy backend.
- Configure production MongoDB.
- Configure Gemini API.
- Configure media storage.
- Test the deployed application.

---

# 17. IMPORTANT DEVELOPMENT RULES FOR CODEX

This specification is the single source of truth for the project.

Codex must follow these rules:

1. Read the complete SPEC.md before writing code.
2. Follow the specified technology stack.
3. Do not introduce unrelated frameworks or technologies.
4. Follow the specified folder structure unless a documented technical reason requires a change.
5. Implement the application in small, logical phases.
6. Build reusable React components.
7. Keep frontend, backend, AI logic, and media generation separate.
8. Follow the API contracts and database schemas.
9. Never expose the culprit or solution before verdict submission.
10. Never hardcode investigation stories as the primary generation mechanism.
11. Use Gemini for dynamic mystery generation.
12. Do not use placeholder data as a substitute for working AI integration.
13. If an external media-generation service is unavailable, implement the specified fallback.
14. Handle loading, empty, error, and success states.
15. Test each feature before moving to the next phase.
16. Do not silently change requirements.
17. Document any necessary deviations in the project documentation.
18. Keep the README and SPEC.md updated when implementation decisions change.


There are three things I deliberately included because they are important to making this project actually work:

1. Hidden culprit mechanism: The culprit and solution must remain exclusively on the backend until the user submits their verdict. Otherwise, users could inspect browser data and discover the answer.

2. AI-generated CCTV: Gemini text generation alone cannot create playable CCTV videos. The specification therefore supports actual AI-generated video when a compatible media model is available, with simulated CCTV playback as a fallback.

3. Dynamic investigations: Every mystery must be generated from the user's input. Predefined cases should only be used for development testing, not as the main application functionality.

## FINAL PROJECT DEFINITION 

AI Mystery Room is a full-stack, AI-powered mystery investigation web application that transforms user-provided scenarios into interactive fictional investigations. Using the MERN stack and Google Gemini, the platform generates suspects, motives, timelines, conversations, photographs, and simulated surveillance evidence. Users explore the evidence, investigate inconsistencies, and identify the culprit. The application then evaluates their verdict and reveals the complete solution.

**Core Experience: Create a Mystery → Investigate the Evidence → Find the Culprit.**