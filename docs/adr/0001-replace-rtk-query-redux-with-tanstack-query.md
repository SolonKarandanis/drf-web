# ADR 0001: Replace RTK Query + Redux Toolkit with TanStack Query

## Status
Accepted

## Context

The app uses RTK Query for all data fetching (6 injected endpoint slices) and Redux Toolkit for two
additional slices:

- `authSlice` — holds the access token in Redux state after a 401 refresh. Only used internally by
  `baseQueryWithReauth`; nothing in the UI reads it. The token is also written to `localStorage`
  simultaneously, and `prepareHeaders` reads from `localStorage` directly — making the Redux store
  redundant.
- `cartSlice` — optimistic UI state: a `mutateQuantity` action fires before the server call, and a
  `updateRequests` queue accumulates pending server calls before flushing. This batching was
  incidental, not intentional UX.

The app already runs TanStack Start + TanStack Router. Adding TanStack Query replaces the last
reason to keep Redux in the dependency tree.

## Decision

Replace RTK Query and Redux Toolkit entirely with TanStack Query (React Query). Migrate in a single
pass (big bang).

Specific choices made:

| Question | Decision | Reason |
|---|---|---|
| `authSlice` | Drop it | Token writes go directly to `localStorage`; nothing reads Redux state |
| `cartSlice` batching | Replace with TanStack Query `onMutate`/`onSettled` | Batching was incidental; standard optimistic updates are simpler and correct |
| HTTP client | Plain `fetch` wrapper (`fetchWithAuth` + `fetchPublic`) | No need for axios; token logic is simple and TanStack Query owns caching |
| Public endpoints | Two functions, not a URL whitelist | Explicit at call site; whitelist breaks silently when new public endpoints are added |
| Route loaders | `ensureQueryData` for primary entity, `prefetchQuery` for secondary | Blocks navigation on critical data; secondary loads in parallel |
| SSR prefetching | Client-side only | Token store is `localStorage` (browser-only); SSR path requires rethinking token flow, not worth the complexity now |
| Cache invalidation | `invalidateQueries` on mutation success | Eliminates cache/shape drift; refetch cost is negligible for user interactions |
| Cart optimistic updates | `onMutate` + `onError` rollback | Cart must respond instantly; this is the one case where manual patch is correct |
| QueryClient location | Created inside `getRouter()`, passed via router context | Fresh instance per server render (no data leaking between SSR requests) |
| Migration strategy | Big bang | App is small; RTK Query and Redux are entangled enough that incremental migration adds bookkeeping without safety |
| File structure | `src/shared/query/` flat directory | Mirrors the old `src/shared/redux/` shape; query factories must be in `shared/` to avoid circular imports between loaders and components |

## Consequences

- Redux Toolkit and RTK Query are removed from the dependency tree entirely.
- `src/shared/redux/` is deleted. Replaces with `src/shared/query/`.
- `baseQueryWithReauth` → `fetchWithAuth` in `src/shared/query/client.ts`. Refresh mutex stays;
  `api.dispatch(setAccesToken(...))` is removed.
- The AUTH.md "RTK Query" row becomes "TanStack Query". Debugging references to `apiSlice.ts`
  update to `src/shared/query/client.ts`.
- Route loaders gain a `context.queryClient` reference. `router.tsx` passes `{ queryClient }`
  via `createRouter({ context: { queryClient } })`.
- `__root.tsx` `ReduxProvider` is replaced by `QueryClientProvider` reading from route context.
- All 86 RTK Query hook call sites become `useQuery` / `useMutation` consuming `queryOptions`
  factories from `src/shared/query/<domain>.ts`.
