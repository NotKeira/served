# served

Minimalist private media server for self-hosting. Dark mode only.

## Setup

- Frontend: TypeScript, node http server, TailwindCSS
- Backend: Rust
- Infrastructure: Kubernetes with S3 storage
- Routing: Cloudflare -> Nginx -> Kubernetes nodeport

## Features

- User authentication and accounts
- Media storage and streaming
- Chunked uploads with admin bypass to Nginx
- Dark UI, minimal design

## Directories

```
served/
├── backend/        Rust server
├── frontend/       TypeScript UI
├── infra/          Kubernetes configs
└── shared/         Common types
```

## Development

Conventional commits. See CHANGELOG.md for versions and SECURITY.md for security.

## License

MIT. See LICENSE.
