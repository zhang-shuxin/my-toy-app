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
default and must return the processed transparent image as an image response
(normally `image/png`). Set `VITE_BACKGROUND_REMOVAL_URL` when the endpoint is
hosted at a different URL. The endpoint should use HTTPS in production and
enforce the same upload size and image validation rules as the regular upload
endpoint.

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
