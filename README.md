# aiChat

An opinionated minimal AI chat demo application with a TypeScript + React frontend (Vite) and a lightweight Python backend. This repository contains the web client in `src/` and a small Flask-like backend in `backend/` that exposes the API used by the frontend.

**Status:** Development (local dev ready)

**Contents:** frontend (Vite + React + TypeScript) and backend (Python)

---

<img width="860" height="912" alt="image" src="https://github.com/user-attachments/assets/8d942c40-abc1-44b8-a1f1-33e1e82a1aaf" />

---

**Table of contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
  - [Frontend (client)](#frontend-client)
  - [Backend (server)](#backend-server)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development Tips](#development-tips)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview

`aiChat` is a small demo chat application meant to show an integration between a modern TypeScript React single-page app (built with Vite) and a simple Python backend. The frontend handles the UI and talks to the backend's API, which can be extended to call an LLM service or any chat processing logic.

This repository is useful as a starter kit for building conversational UI prototypes.

## Features

- Minimal, responsive chat UI built with React + TypeScript.
- Simple backend API to receive and respond to messages.
- Clear separation between frontend and backend for easy extension.

## Tech Stack

- Frontend: Vite, React, TypeScript, CSS
- Backend: Python (Flask or similar), requirements managed in `backend/requirements.txt`
- Tooling: npm/yarn for frontend, python3/venv for backend

## Prerequisites

- Node.js (14+ recommended) and npm (or yarn)
- Python 3.8+ and `pip`

## Local Setup

Follow these steps to get both frontend and backend running locally.

### Frontend (client)

1. Open a terminal at the project root (where `package.json` lives).

```bash
cd /path/to/aiChat
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. The Vite dev server usually opens at `http://localhost:5173` (or a similar port shown in the terminal).

Common scripts (in `package.json`):

- `npm run dev` — start Vite development server
- `npm run build` — build production frontend
- `npm run preview` — preview the production build

### Backend (server)

1. Create and activate a Python virtual environment in the `backend/` folder, then install dependencies:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run the server (the project includes `app.py` in `backend/`):

```bash
python app.py
```

3. By default the backend may listen on `http://127.0.0.1:5000` (check `app.py` for exact settings).

Notes:

- If you used `pip freeze > requirements.txt` already, ensure the `requirements.txt` contains all needed packages (Flask, etc.).
- If the backend uses a different framework or additional environment variables, check `backend/app.py` and `backend/setup.txt` for clues.

## Running the App

1. Start the backend first so the API is available:

```bash
cd backend
source .venv/bin/activate
python app.py
```

2. Start the frontend in another terminal:

```bash
cd /path/to/aiChat
npm run dev
```

3. Open the URL printed by the Vite server in your browser and use the chat interface.

## API Endpoints

This project contains a simple API client at `src/api/api.ts` (frontend) and server handlers in `backend/app.py`.

Common endpoints (adjust for the actual implementation in `backend/app.py`):

- `POST /chat` — send a message payload `{ "message": "..." }` and receive a response `{ "reply": "..." }`.

Inspect `src/api/api.ts` and `backend/app.py` for exact request shapes and any additional routes.

## Project Structure

Top-level:

- `index.html` — Vite entry
- `package.json`, `tsconfig.json`, `vite.config.ts` — frontend tooling
- `src/` — React + TypeScript source
  - `main.tsx`, `App.tsx` — app entry and top-level component
  - `components/` — UI components (`InputForm`, `Message`, etc.)
  - `api/api.ts` — small client wrapper for backend API calls
- `public/` — static public assets
- `backend/` — Python service
  - `app.py` — server application
  - `requirements.txt` — Python dependencies

## Development Tips

- Hot reload: Vite dev server provides fast HMR for the frontend.
- Backend changes: if using Flask, enable `FLASK_ENV=development` or use `--reload` so code changes auto-restart the server.
- Cross-origin requests: if you run frontend and backend on different origins during dev, enable CORS in the backend or configure a proxy in Vite.

To add a new feature:

1. Add/update API route in `backend/app.py`.
2. Extend `src/api/api.ts` with a helper for the new endpoint.
3. Create UI components under `src/components/` and update `App.tsx`.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo and create a feature branch.
2. Implement features or fixes with small, focused commits.
3. Open a pull request with a clear description of changes.

If you plan to add third-party services (LLM providers, etc.), do not commit API keys—use environment variables instead and document them here.

## Troubleshooting

- If `npm run dev` shows port conflicts, stop other servers or change the Vite port in `vite.config.ts`.
- If the frontend fails to call the backend, check the backend URL used in `src/api/api.ts` and ensure CORS is enabled on the backend.
- For missing Python packages, re-run `pip install -r requirements.txt` inside the virtualenv.

## License

This repository does not include a license file by default. Add a `LICENSE` if you intend to open-source the code, or include a short license statement here.

---

