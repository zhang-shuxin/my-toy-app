# Toy Community

## Staff data control

The staff data-control page is separate from the user-facing pages. Open
`/staff-control` and sign in with the backend staff password. It reads the
configured API, shows toy records and comments, supports searching and
refreshing, and can delete records through authenticated staff endpoints.

The app routes are:

- `/` — welcome page
- `/dollhouse` — user dollhouse page
- `/projector` — projector display

The staff data-control view is intentionally not a public route. Open it from
the separate `/staff-control` URL and sign in with the staff password. It is
not linked from the user-facing pages.

## Research consent

The welcome screen requires users to check the research-consent checkbox before
entering the dollhouse. The consent sentence links to `/research-consent`,
which presents the user consent notice for digital contributions and system
interaction logs, including academic research use, GDPR (EU 2016/679)
processing, secure retention, voluntary participation, withdrawal until
25 December 2026, applicable data-subject rights, and the research contact
address.

## User languages

The user-facing page includes a language selector for Catalan, Spanish,
French, English, and Chinese. The selected language is remembered in the
browser for the next visit.

The frontend uses `VITE_API_BASE_URL` from `.env`. Set it to an API URL that is
reachable from the teacher's computer before starting the app, for example:

```text
VITE_API_BASE_URL=http://TEACHER_COMPUTER_IP:5001/api
```

The backend must be running and configured to accept connections from the
computer hosting the frontend.

When a user selects **UPLOAD & REMOVE BACKGROUND**, the original image is sent
to the server as multipart form data instead of being processed on the phone.
The background-removal endpoint is `${VITE_API_BASE_URL}/remove-background` by
default and must accept `POST` multipart form data with a `toyImage` field.
The server must save the original upload in its original-photos directory,
run background removal on the server, save the result in its
removed-background-photos directory, and return JSON containing both
`originalImageUrl` and `processedImageUrl` (the frontend also accepts
`originalUrl` and `imageUrl`/`url` aliases). Set `VITE_BACKGROUND_REMOVAL_URL`
when the endpoint is hosted at a different URL.

The response's `processedImageUrl` is retained while the user positions the
toy. Sharing the toy in the house sends only that existing URL to
`POST /toys`; it does not upload the image again.

The `/remove-background` endpoint should use HTTPS in production and enforce
the same upload size and image validation rules as the regular upload
endpoint. A direct binary image response is not sufficient because the
frontend needs the persisted URLs for both files.

## Development

Run the app from this directory with `npm run dev`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
