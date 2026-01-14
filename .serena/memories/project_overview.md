Purpose: Sample app demonstrating JWT auth in a React app, with an Express server issuing and validating JWTs (HS256). Frontend stores token in LocalStorage and uses Axios interceptor to attach Authorization header.

Tech stack:
- Frontend: React 19, TypeScript 5, react-scripts (CRA)
- Backend: Express 4, jsonwebtoken, express-jwt, cors
- HTTP client: axios
- Testing: Jest via react-scripts + @testing-library

Codebase structure (top-level):
- src/: React app and Express server
  - App.tsx/App.css: UI and client logic
  - index.tsx/index.css: entry point
  - server.js: Express JWT server (port 3001)
- public/: static assets
- package.json: scripts and deps
- tsconfig.json: strict TypeScript config

Runtime/ports (from README):
- React dev server: 3000
- Express server: 3001
