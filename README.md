# Mello landing page

Production-oriented Next.js 14 landing page for Mello. The UI currently runs entirely against typed mock services, with no backend requests.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Frontend architecture

```text
src/
  features/
    landing-page/
      components/       Presentational UI and one thin page container
      hooks/            Loading, error, empty, retry, and form state
      services/         Feature-facing data facade
      types.ts           Contracts shared by UI and services
      index.ts           Public feature exports
  shared/
    components/         Reusable brand, reveal, and async-state UI
    hooks/              Shared hooks as they are introduced
    lib/                Runtime configuration and utilities
  services/
    api/                Typed service boundary and API client foundation
    mocks/              Typed mock content and mock mutations
```

`app/page.tsx` only mounts the landing-page feature. Components do not call `fetch` and do not choose between mocks and a backend.

## Data flow

```text
component -> feature hook -> feature service -> typed API function -> mock implementation
```

The mock implementation simulates 300 ms latency. Loading, error, empty, retry, submitting, and submission-error states are handled explicitly.

## Backend handoff

1. Implement the real calls inside `src/services/api/landing.api.ts`, using `apiClient` from `src/services/api/client.ts` for base URL, headers, and normalized errors.
2. Keep the existing function names, inputs, and return types unchanged.
3. Set `NEXT_PUBLIC_USE_MOCKS=false` and configure `NEXT_PUBLIC_API_BASE_URL`.

No component or hook changes should be required.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
