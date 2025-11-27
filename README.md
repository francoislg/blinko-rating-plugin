# Blinko Rating Plugin

A Blinko plugin that enables users to rate their notes using a 1-5 star rating system. Supports both personal ratings and collaborative multi-user ratings with aggregate displays.

## Features

- ⭐ 1-5 star rating system for notes
- 👥 Multi-user collaborative ratings with averages
- 🏷️ Tag-based filtering (whitelist/blacklist modes)
- 🌍 Internationalization support (English, Chinese, French)
- 🎨 Expandable/collapsible multi-user view
- ⚡ Real-time config updates without page reload
- 📊 Vote count and average rating display

## Quick Start

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

3. Connect to Blinko:
   - Open Blinko Settings → Plugin Setting → Local Development
   - Add WebSocket URL: `ws://localhost:8080`

4. Configure in Blinko:
   - Enable the plugin in Blinko settings
   - Open plugin settings to configure tag filtering

## Configuration

The plugin supports flexible tag-based filtering:

- **Whitelist Mode**: Only show ratings on notes with selected tags
- **Blacklist Mode**: Show ratings on all notes except those with selected tags
- **Enable/Disable**: Toggle the entire rating system on/off

## Data Storage

Ratings are stored in note metadata:
```typescript
note.metadata.starRatings = {
  "userId1": 5,
  "userId2": 3,
  "userId3": 4
}
```

## Development

- **Entry Point**: `src/index.tsx`
- **Main Component**: `src/RatingContainer.tsx`
- **Settings Panel**: `src/RatingSettings.tsx`
- **Data Layer**: `src/rating-data.ts`, `src/rating-config.ts`

See `CLAUDE.md` for detailed architecture and development guidelines.

## License

MIT
