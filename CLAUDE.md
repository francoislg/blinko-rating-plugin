# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Blinko plugin** that enables users to rate their notes and blinks using a 1-5 star rating system. The plugin supports both personal ratings and collaborative team ratings with aggregate displays and voter visibility.

**Key Repository Context:**
- This project is based on the Blinko plugin template
- Plugin architecture uses SystemJS module loading
- Built with Preact (not React) for UI components
- Uses Bun as the package manager and runtime
- See `.claude/docs/DESIGN.md` for comprehensive feature design documentation

## Development Commands

### Essential Commands
```bash
# Install dependencies (must use Bun, not npm/yarn/pnpm)
bun install

# Start development server with live reload
bun run dev
# Server runs on port 8080 and provides WebSocket connection for hot reloading
# Visit http://localhost:3000 for connection instructions

# Build and publish for production
bun run release:publish
# Creates production build in release/ directory

# Expose local dev server via ngrok (for testing with remote Blinko instances)
bun run ngrok
```

### Connecting Plugin to Blinko
1. Start dev server with `bun run dev`
2. Open Blinko Settings → Plugin Setting → Local Development tab
3. Add WebSocket URL:
   - Local: `ws://localhost:8080`
   - Network: `ws://<your-local-ip>:8080`
   - Ngrok: `wss://<subdomain>.ngrok.io`

## Architecture

### Plugin System Architecture

**SystemJS Module Pattern:**
The plugin entry point (`src/index.tsx`) uses SystemJS module registration to dynamically load into Blinko. The pattern is:

```typescript
System.register([], (exports) => ({
  execute: () => {
    exports('default', class Plugin implements BasePlugin {
      // Plugin lifecycle methods
    });
  }
}));
```

**Key Plugin Lifecycle Methods:**
- `constructor()`: Initialize plugin metadata from plugin.json
- `init()`: Called when plugin loads - register UI extensions here
- `renderSettingPanel()`: Render plugin settings UI (if `withSettingPanel = true`)
- `destroy()`: Cleanup when plugin is disabled

### Blinko Plugin API

The global `window.Blinko` object provides plugin APIs:

**UI Extension Points:**
- `addToolBarIcon({name, icon, tooltip, placement, content})` - Add toolbar buttons
- `addRightClickMenu({name, label, icon, onClick})` - Add context menu items
- `addAiWritePrompt(name, promptText, icon)` - Add AI writing prompts
- `showDialog({title, content})` - Show modal dialogs
- `addCardFooterSlot({name, content})` - Inject UI into note card footer (see Card Footer Injection section)

**Data Persistence:**
```typescript
// Save plugin configuration
await window.Blinko.api.config.setPluginConfig.mutate({
  pluginName: 'plugin-name',
  key: 'keyName',
  value: valueString
});

// Load plugin configuration
const config = await window.Blinko.api.config.getPluginConfig.query({
  pluginName: 'plugin-name'
});
```

**Note Metadata APIs:**
```typescript
// Update note metadata (preserves existing metadata)
await window.Blinko.api.notes.upsert.mutate({
  id: Number(noteId),
  metadata: {
    ...existingMetadata,
    customField: customValue
  }
});
```

**User & Store Access:**
- `window.Blinko.store.userStore.id` - Current user ID
- `window.Blinko.api.tags.list.query()` - Fetch all tags

**Other APIs:**
- `window.Blinko.i18n` - Internationalization (i18next)
- `window.Blinko.toast` - Toast notifications (success, error, info)
- `window.Blinko.closeDialog()` - Close current dialog
- `window.Blinko.refresh()` - Refresh Blinko UI

### Component Architecture

**Preact-Specific Patterns:**
- Use `/** @jsxImportSource preact */` at the top of TSX files
- Import from `preact/hooks` not `react`
- Use `JSXInternal.Element` for return types
- Render components to DOM containers for Blinko integration:
  ```typescript
  const container = document.createElement('div');
  render(<Component />, container);
  return container;
  ```

**State Management:**
- Use Preact hooks (useState, useEffect, etc.)
- No global state management library in template
- Access Blinko's stores via `window.Blinko.blinkoStore`, `window.Blinko.baseStore`, etc.

### Card Footer Injection

**Adding UI to Note Cards:**
Use `window.Blinko.addCardFooterSlot()` to inject custom UI into note card footers:

```typescript
window.Blinko.addCardFooterSlot({
  name: "my-slot-name",
  content: (note: Note) => {
    const container = document.createElement("div");

    // Early return for invalid notes
    if (!note) {
      return container;
    }

    // Render multiple components together using JSX array mapping
    render(
      <>
        {items.map((item) => (
          <MyComponent key={item.id} item={item} />
        ))}
      </>,
      container
    );

    return container;
  }
});
```

**Important Patterns:**
- Always create and return a container, even if empty
- Use JSX array mapping (`.map()`) to render multiple components in single `render()` call
- Don't use `forEach` with separate `appendChild()` calls - causes errors
- Add proper `key` props when mapping components

### Internationalization

Translation files in `src/locales/`:
- `en.json` - English translations
- `zh.json` - Chinese translations
- `fr.json` - French translations

Register translations in plugin init:
```typescript
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import fr from "./locales/fr.json";

window.Blinko.i18n.addResourceBundle('en', 'translation', en);
window.Blinko.i18n.addResourceBundle('zh', 'translation', zh);
window.Blinko.i18n.addResourceBundle('fr', 'translation', fr);
```

Use in components:
```typescript
const i18n = window.Blinko.i18n;
<span>{i18n.t('translationKey', { variable: value })}</span>

// With pluralization
<span>{i18n.t('votes', { count: voteCount })}</span>
```

**Translation Structure:**
Organize translations by feature area for maintainability:
```json
{
  "settings": {
    "title": "Settings Title",
    "save": "Save"
  },
  "rating": {
    "vote": "vote",
    "vote_plural": "votes"
  }
}
```

## Configuration Files

### plugin.json
Plugin metadata required by Blinko:
- `name`: Unique plugin identifier (used for config API)
- `version`: Semantic version
- `minAppVersion`: Minimum Blinko version required
- `displayName`: Object with locale keys (default, zh, etc.)
- `description`: Object with locale keys
- `author`, `url`, `readme`: Metadata fields

**Important:** The `name` field must match the `pluginName` used in config API calls.

### tsconfig.json
Key TypeScript settings:
- `jsxImportSource: "preact"` - Use Preact for JSX
- `types: ["blinko", "node"]` - Blinko type definitions from npm package
- `strict: true` - Enable all strict type checking

### vite.config.ts
Build configuration:
- Uses `@preact/preset-vite` for Preact support
- Uses `vite-plugin-blinko` for plugin-specific build transformations
- Output goes to `dist/` (dev) or `release/` (production)

## Rating Plugin Architecture

### Component Structure

**Core Components:**
- `RatingContainer.tsx` - Main rating UI with multi-user support
- `StarRating.tsx` - Reusable star display component
- `UserAvatar.tsx` - User avatar display
- `RatingSettings.tsx` - Settings panel with tag filtering

**Data Layer:**
- `rating-config.ts` - Configuration management with event-based refresh
- `rating-data.ts` - Rating data access and persistence
- `types.ts` - TypeScript type definitions

### Data Storage

**Note Metadata Structure:**
Ratings are stored in note metadata as user ID to rating mappings:
```typescript
note.metadata = {
  starRatings: {
    "userId1": 5,
    "userId2": 3,
    "userId3": 4
  }
}
```

**Configuration Storage:**
Plugin settings stored via config API:
```typescript
{
  starsConfig: JSON.stringify({
    enabled: true,
    mode: "blacklist", // or "whitelist"
    tags: ["tag1", "tag2"]
  })
}
```

### Event-Based Config Refresh

**Pattern for Real-Time Config Updates:**

1. **Emit event after saving settings:**
```typescript
await window.Blinko.api.config.setPluginConfig.mutate({...});
window.dispatchEvent(new CustomEvent('blinko-rating-plugin-update'));
```

2. **Listen for event in config class:**
```typescript
async init() {
  await this.loadConfig();

  window.addEventListener('blinko-rating-plugin-update', () => {
    this.loadConfig();
  });
}
```

This allows settings changes to take effect immediately without page reload.

### Multi-Rating Type Support

**Architecture for Extensibility:**
The plugin is designed to support multiple rating types (stars, likes, etc.):

```typescript
// Each rating type has independent config
type RatingType = "stars" | "likes" | "thumbs";

// Determine which types to show for each note
getRatingsToDisplay(note: Note): RatingType[] {
  const allTypes: RatingType[] = ["stars"];
  return allTypes.filter(type => this.shouldShowRatingType(note, type));
}

// Render all applicable types
ratingsToDisplay.map((ratingType) => {
  const data = getRatingForNote(note, ratingType);
  return <RatingComponent key={ratingType} {...data} />;
});
```

## Development Guidelines

### Code Patterns

**Creating Preact Components for Blinko:**
```typescript
export function MyComponent(): JSXInternal.Element {
  // Component logic
  return <div>Content</div>;
}

// When registering with Blinko API:
const container = document.createElement('div');
container.setAttribute('data-plugin', 'my-plugin-name');
render(<MyComponent />, container);
return container;
```

**Persisting Plugin Data:**
```typescript
// Always use try-catch for API calls
try {
  await window.Blinko.api.config.setPluginConfig.mutate({
    pluginName: 'blinko-rating-plugin',
    key: 'dataKey',
    value: JSON.stringify(data)
  });
  window.Blinko.toast.success('Saved successfully');
} catch (error) {
  window.Blinko.toast.error('Failed to save');
  console.error('Save error:', error);
}
```

**Handling Right-Click Menu Actions:**
```typescript
window.Blinko.addRightClickMenu({
  name: 'unique-action-id',
  label: 'Action Label',
  icon: 'iconify-icon-name',  // From Iconify
  onClick: (note) => {
    // note object contains note data
    // Can access note.id, note.content, etc.
    console.log('Note:', note);
  }
});
```

## Testing & Debugging

**Development Workflow:**
1. Start `bun run dev` in terminal
2. Connect plugin to Blinko instance via WebSocket
3. Make code changes - server auto-reloads
4. Check browser console for errors
5. Use `console.log()` freely - will appear in browser dev tools

**Common Issues:**
- **Plugin doesn't load:** Check plugin.json syntax and WebSocket connection
- **UI doesn't update:** Verify Preact render() is called and container returned
- **API calls fail:** Check pluginName matches plugin.json name field
- **TypeScript errors:** Ensure `blinko` types are installed (`bun install`)

### Tag-Based Filtering

**Whitelist/Blacklist Pattern:**
The settings UI implements a flexible tag filtering system:

```typescript
interface RatingTypeConfig {
  enabled: boolean;
  mode: "whitelist" | "blacklist";
  tags: string[];
}

// Whitelist: Only show ratings on notes with selected tags
// Blacklist: Show ratings on all notes except those with selected tags

shouldShowRatingType(note: Note, ratingType: RatingType): boolean {
  const config = this.getConfig(ratingType);

  if (!config.enabled) return false;

  const noteTags = note.tags.map(t => t.tag.name);

  if (config.mode === "whitelist") {
    return config.tags.length === 0 ||
           noteTags.some(tag => config.tags.includes(tag));
  } else {
    return config.tags.length === 0 ||
           !noteTags.some(tag => config.tags.includes(tag));
  }
}
```

### UI Patterns

**Multi-User Rating Display:**
- Collapsed view: Shows average rating + "Vote" button
- Expanded view: Shows all user ratings with interactive controls
- Optimistic updates for better UX (rollback on error)

**Settings Modal:**
- Max height constraint: `maxHeight: '80vh', overflowY: 'auto'`
- Filter input for tag search
- Inline styles for scrollable sections (better than Tailwind classes in dialogs)

## Key Files Reference

**Core Plugin Files:**
- `src/index.tsx` - Plugin entry point, lifecycle methods, card footer slot registration
- `src/RatingContainer.tsx` - Main rating component with multi-user UI
- `src/StarRating.tsx` - Reusable star display component
- `src/UserAvatar.tsx` - User avatar component
- `src/RatingSettings.tsx` - Settings panel with tag filtering
- `src/rating-config.ts` - Configuration management with event listeners
- `src/rating-data.ts` - Rating data access, storage, and filtering logic
- `src/types.ts` - TypeScript type definitions

**Localization:**
- `src/locales/en.json` - English translations
- `src/locales/zh.json` - Chinese translations
- `src/locales/fr.json` - French translations

**Configuration:**
- `plugin.json` - Plugin metadata (name, version, descriptions)
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

## External Resources

- [Blinko Plugin Documentation](https://blinko.mintlify.app/plugins/get-started)
- [Blinko Plugin API Reference](https://blinko.mintlify.app/en/plugins/api-reference)
- [Plugin Template Repository](https://github.com/blinko-space/blinko-plugin-template)
- [Preact Documentation](https://preactjs.com/)
- Remeber to double-check that the TypeScript compiles wafter your changes
## Key Learnings & Best Practices

### Critical Patterns

1. **Rendering Multiple Components:** Always use `.map()` in a single render call, never `forEach` with `appendChild`
   ```typescript
   // ✅ Correct
   render(<>{items.map(item => <Component key={item.id} />)}</>, container);

   // ❌ Wrong - causes appendChild errors
   items.forEach(item => {
     const c = document.createElement('div');
     render(<Component />, c);
     container.appendChild(c);
   });
   ```

2. **Event-Based Config Sync:** Use CustomEvents for real-time config updates across plugin instances

3. **Inline Styles in Dialogs:** Use `style={{}}` for scrollable sections instead of Tailwind classes when inside Blinko dialogs

4. **Metadata Preservation:** Always spread existing metadata when updating:
   ```typescript
   metadata: { ...note.metadata, newField: value }
   ```

5. **File Naming:** Use PascalCase for component files (RatingContainer.tsx, not rating-container.tsx)

### Testing Checklist

- [ ] Plugin loads in Blinko without errors
- [ ] Settings save and apply immediately (event-based refresh)
- [ ] Multi-user ratings display correctly
- [ ] Tag filtering works (whitelist/blacklist modes)
- [ ] All strings are localized (check all 3 languages)
- [ ] Optimistic updates work with proper rollback
- [ ] TypeScript compiles without errors (`bun run dev`)

Remember to double-check that TypeScript compiles after your changes!
