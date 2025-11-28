# Blinko Rating Plugin - Design

## Overview

Multi-user rating plugin for Blinko notes. Supports star ratings (1-5) and upvote/downvote systems with tag-based filtering.

## Features

- **Multiple rating types:** Stars and upvotes (extensible architecture)
- **Multi-user collaboration:** Individual ratings + aggregate display
- **Tag filtering:** Whitelist/blacklist modes per rating
- **Card footer integration:** Inline rating UI on note cards
- **Multi-user sync protection:** Preserves other users' configurations
- **Real-time updates:** Event-based config refresh

## Data Architecture

### Storage Model

**Card-Based Metadata** (per note):
```typescript
note.metadata.ratingConfigs = {
  "guid-1": {
    enabled: true,
    type: "stars",                    // or "upvotes"
    label: "Quality",
    ratings: { "userId1": 5, "userId2": 3 },
    createdBy: "userId1"              // For multi-user protection
  }
}
```

**Plugin Configuration** (user settings):
```typescript
{
  ratings: [
    {
      guid: "guid-1",
      name: "Quality",
      enabled: true,
      type: "stars",
      mode: "whitelist",              // or "blacklist"
      tags: ["important", "review"],
      label: "Quality rating"
    }
  ]
}
```

### Multi-User Sync Protection

- Each rating config has `createdBy` field
- Sync operations only modify current user's configs
- Other users' configs are preserved completely
- All users' individual ratings are always preserved

See: `src/rating-card-sync.ts`

## Tag Filtering

**Whitelist mode:** Show rating only on notes with selected tags
**Blacklist mode:** Show rating on all notes except those with excluded tags
**Default:** Whitelist (safer for new ratings)

See: `src/rating-data.ts` `shouldShowRating()`

## User Interface

### Note Card Display

Ratings appear in note card footer via `window.Blinko.addCardFooterSlot()`:
- **Personal mode:** Shows user's rating
- **Collaborative mode:** Expandable view with all users' ratings
- **Optimistic updates:** Immediate UI feedback with error rollback

See: `src/index.tsx`, `src/ratings/`

### Settings Panel

**Components:**
- Rating list with enable/disable toggles
- Tag filtering with whitelist/blacklist toggle
- Add new rating dialog
- Save & sync controls

**Save & Sync Workflow:**
- Default: "Save and Sync Notes" (auto-syncs to all notes)
- Option: "Do not sync on save" checkbox
- Settings always saved; sync optional

See: `src/settings/`

## Internationalization

**Languages:** English, Chinese, French
**Key prefix:** `ratings_` (avoids conflicts with Blinko core)
**Files:** `src/locales/{en,zh,fr}.json`

## Technical Implementation

### Event-Based Updates

CustomEvent `'blinko-rating-plugin-update'` triggers real-time config refresh across plugin instances.

**Emit:** After saving settings (`src/settings/RatingSettings.tsx`)
**Listen:** Config init (`src/rating-config.ts`)

### Component Architecture

**Entry:** `src/index.tsx`
**Rating types:** `src/ratings/stars/`, `src/ratings/upvotes/`
**Settings:** `src/settings/` (modular components)
**Data layer:** `src/rating-{config,data,card-sync}.ts`
**Types:** `src/types.ts`

### Tailwind + Dark Mode

- Consistent with Blinko design system
- Dark mode support via `dark:` utility classes
- Inline styles for scrollable dialogs

## Known Limitations

- `tags.list.query()` may only return current user's tags (not shared)
  - **Workaround:** Extract tags from `notes.list.mutate()` in settings
- Plugin config API used for settings (note metadata for ratings)

## Implementation Status

**✅ Completed:**
- Card-based metadata storage
- Stars and upvotes rating types
- Multi-user sync protection
- Tag filtering (whitelist/blacklist)
- Settings UI with modular components
- Save & sync workflow with toggle
- i18n support (en, zh, fr)
- Event-based config refresh
- Dark mode support
- TypeScript strict mode

**Status:** Production-ready v1.0

---

**Updated:** 2025-11-28
