---
name: migrate-to-shoehorn
description: Migrate test assertions to @total-typescript/shoehorn when the user requests that migration or shoehorn-based fixtures.
---

# Migrate to Shoehorn

## Why shoehorn?

`shoehorn` lets you pass partial data in tests while keeping TypeScript happy. It replaces `as` assertions with type-safe alternatives.

**Test code only.** Never use shoehorn in production code.

Problems with `as` in tests:

- Trained not to use it
- Must manually specify target type
- Double-as (`as unknown as Type`) for intentionally wrong data

## Install

```bash
npm install --save-dev @total-typescript/shoehorn
```

## Migration patterns

### Large objects with few needed properties

Before:

```ts
type Request = {
  body: { id: string };
  headers: Record<string, string>;
  cookies: Record<string, string>;
  // ...20 more properties
};

it("gets user by id", () => {
  // Only care about body.id but must fake entire Request
  getUser({
    body: { id: "123" },
    headers: {},
    cookies: {},
    // ...fake all 20 properties
  });
});
```

After:

```ts
import { fromPartial } from "@total-typescript/shoehorn";

it("gets user by id", () => {
  getUser(
    fromPartial({
      body: { id: "123" },
    }),
  );
});
```

### `as Type` → `fromPartial()`

Before:

```ts
getUser({ body: { id: "123" } } as Request);
```

After:

```ts
import { fromPartial } from "@total-typescript/shoehorn";

getUser(fromPartial({ body: { id: "123" } }));
```

### `as unknown as Type` → `fromAny()`

Before:

```ts
getUser({ body: { id: 123 } } as unknown as Request); // wrong type on purpose
```

After:

```ts
import { fromAny } from "@total-typescript/shoehorn";

getUser(fromAny({ body: { id: 123 } }));
```

## When to use each

| Function        | Use case                                           |
| --------------- | -------------------------------------------------- |
| `fromPartial()` | Pass partial data that still type-checks           |
| `fromAny()`     | Pass intentionally wrong data (keeps autocomplete) |
| `fromExact()`   | Force full object (swap with fromPartial later)    |

## Workflow

1. Inspect the requested test files, existing fixtures, and dependency manifest. Infer whether each assertion represents partial data or deliberately invalid input from the test's purpose. Ask only when the migration scope or intended behavior cannot be established from the request and code. A generic need for partial test data does not authorize introducing this dependency or a repository-wide migration.
2. Use the repository's package manager and dependency conventions. Install shoehorn only if needed for the authorized migration, as a test/development dependency. Check its installed API before applying the examples above.
3. Search the scoped test files with `rg`, preserve their behavioral assertions, and migrate only the relevant type assertions. Do not mechanically replace unrelated casts or change production code.
4. Run the affected tests and typecheck. Follow [completion policy](../../../AGENTS.md#completion-and-decisions) and [WORKFLOW](../../../WORKFLOW.md#codex-workflow) for the remaining integration checks and finish.
