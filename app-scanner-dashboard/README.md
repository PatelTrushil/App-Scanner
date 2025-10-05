# App Scanner Dashboard

## Setup
1. `npm create vite@latest app-scanner-dashboard -- --template react-ts`
2. `cd app-scanner-dashboard`
3. `npm install`
4. `npm install recharts`
5. Place provided JSON at `public/data/apps.json`
6. `npm run dev` and open http://localhost:5173

## Notes
- Upload JSON via header Upload button if you prefer local upload.
- For large files, parsing occurs in a Web Worker.
- Design: React + TypeScript + Context API + Recharts + plain CSS.
