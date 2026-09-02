# served-frontend

TypeScript frontend for served media server. Uses node:http server, TailwindCSS, and Lucide icons.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

Server runs on port 9053 (or PORT env var). Access at http://10.10.10.1:9053

## Build

```bash
pnpm run build
```

Compiles TypeScript to `dist/` and bundles CSS with TailwindCSS.

## Start

```bash
pnpm run start
```

Runs compiled server from `dist/server.js`.

## Structure

```
src/
├── app.ts         Main application entry
├── server.ts      HTTP server
├── index.html     HTML template
├── pages/         Page components
├── components/    Reusable components
├── styles/        CSS files
└── utils/         Utilities
```

## Dark Mode

Everything is dark mode only. TailwindCSS dark color palette is pre-configured.
