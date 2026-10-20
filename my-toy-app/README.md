# Toy Community

## Staff data control

Open the existing staff controls by tapping the logo five times on the
dollhouse page, then choose **OPEN DATA CONTROL**. The page reads the
configured API, shows toy records and comments, supports searching and
refreshing, and can delete a toy through the existing API.

You can also open the control page directly at
`http://localhost:5173/?page=control` while the frontend is running.

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
