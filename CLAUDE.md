# CLAUDE.md

Blinko plugin for rating notes with stars and upvotes. Multi-user collaborative ratings.

## Development

```bash
bun install             # Install dependencies
bun run dev             # Dev server
bun run typecheck       # Check types
bun run release:publish # Build
```

Connect: Blinko Settings → Plugin Setting → Local Development → WebSocket URL

## Architecture

**Entry:** `src/index.tsx` - SystemJS plugin, card footer injection
**APIs:** `window.Blinko.api.{config, notes, tags}` + `window.Blinko.{toast, i18n, store}`
**Preact:** `/** @jsxImportSource preact */`, import from `preact/hooks`

## Data Storage

**Note metadata** (card-based): `note.metadata.ratingConfigs[guid] = { enabled, type, label, ratings: {userId: value}, createdBy }`
**Plugin config**: `{ ratings: [{ guid, name, enabled, type, mode, tags }] }`
**Types:** See `src/types.ts`

## Key Features

- **Multi-user sync:** `createdBy` field tracks ownership (see `src/rating-card-sync.ts`)
- **Tag filtering:** Whitelist/blacklist modes (see `src/rating-data.ts`)
- **Save & sync:** Auto-sync toggle in settings (see `src/settings/`)
- **Event refresh:** CustomEvent `'blinko-rating-plugin-update'` (see `src/rating-config.ts`)

## Guidelines

- **i18n:** Use `ratings_` prefix for all translation keys (`src/locales/`)
- **Rendering:** Use `.map()` in single `render()`, not `forEach` + `appendChild`
- **Dialogs:** Use inline `style={{}}` for scrollable sections
- **Metadata:** Always spread: `metadata: { ...note.metadata, newField }`
- **Types:** No explicit `any` - use proper types or `unknown`
- **Tags:** `tags.list.query()` may not return shared tags - extract from `notes.list.mutate()` instead

## Files

**Core:** `src/index.tsx`, `src/ratings/`, `src/settings/`, `src/rating-{config,data,card-sync}.ts`, `src/types.ts`
**i18n:** `src/locales/{en,zh,fr}.json`
**Config:** `plugin.json`, `vite.config.ts`, `tsconfig.json`

## Resources

- [Plugin Docs](https://blinko.mintlify.app/plugins/get-started)
- [API Reference](https://blinko.mintlify.app/en/plugins/api-reference)
- [Template](https://github.com/blinko-space/blinko-plugin-template)
- [Preact](https://preactjs.com/)
- Design: `.claude/docs/DESIGN.md`
