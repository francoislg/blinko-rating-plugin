# Blinko Rating Plugin - Design Document

## 1. Overview

### 1.1 Purpose
The Blinko Rating Plugin enables users to rate their notes and blinks using a star-based rating system. It supports both personal use (individual ratings) and team collaboration (aggregate ratings with voter visibility).

### 1.2 Target Users
- **Personal Users**: Individuals who want to rate and prioritize their own notes
- **Team Users**: Collaborative teams sharing and rating notes together

### 1.3 Key Features
- 1-5 star rating system per note
- Personal rating display (single user)
- Aggregate rating display with voter breakdown (multiple users)
- Sort and filter notes by rating
- Flexible architecture to support future rating systems
- Real-time sync across devices

---

## 2. User Experience

### 2.1 Rating Display Location
- **Primary Location**: Bottom of each note card
- **Visual Style**: Star icons (filled/unfilled) consistent with Blinko's design system

### 2.2 Rating Interaction

#### 2.2.1 Personal Rating Mode (Single User)
```
┌─────────────────────────────────┐
│ Note Content                    │
│ ...                             │
├─────────────────────────────────┤
│ ★★★☆☆ Your rating              │
└─────────────────────────────────┘
```

#### 2.2.2 Collaborative Rating Mode (Multiple Users)
```
┌─────────────────────────────────┐
│ Note Content                    │
│ ...                             │
├─────────────────────────────────┤
│ ★★★★☆ 4.2 average (3 votes)   │
│ You: ★★★★★                      │
│ Alice: ★★★★☆                    │
│ Bob: ★★★☆☆                      │
└─────────────────────────────────┘
```

### 2.3 User Workflows

#### Workflow 1: Rating a Note
1. User views a note card
2. User clicks on a star (1-5) at the bottom of the note
3. Rating is immediately saved and displayed
4. If other users have rated, aggregate updates in real-time

#### Workflow 2: Changing a Rating
1. User clicks on a different star value
2. Previous rating is updated
3. Aggregate recalculates if applicable
4. Toast notification confirms update

#### Workflow 3: Filtering by Rating
1. User opens filter/sort menu (implementation TBD - requires Blinko API)
2. User selects rating criteria (e.g., "4+ stars", "Unrated", "My highest rated")
3. Note list updates to show filtered results

---

## 3. Technical Architecture

### 3.1 System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Blinko Application                   │
│  ┌────────────────────────────────────────────────┐    │
│  │           Rating Plugin                        │    │
│  │  ┌──────────────┐  ┌────────────────────┐     │    │
│  │  │ UI Component │  │  Rating Service    │     │    │
│  │  │  - StarRating│  │  - Save/Load       │     │    │
│  │  │  - Aggregate │  │  - Calculate Avg   │     │    │
│  │  │    Display   │  │  - Sync            │     │    │
│  │  └──────────────┘  └────────────────────┘     │    │
│  │         │                    │                 │    │
│  │         └────────────────────┘                 │    │
│  │                    │                           │    │
│  │         ┌──────────▼──────────┐                │    │
│  │         │   Data Store        │                │    │
│  │         │  (Plugin Config)    │                │    │
│  │         └─────────────────────┘                │    │
│  └────────────────────────────────────────────────┘    │
│         │                                               │
│         ▼                                               │
│  ┌──────────────────┐                                  │
│  │  Blinko Core API │                                  │
│  │  - config API    │                                  │
│  │  - note data     │                                  │
│  └──────────────────┘                                  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Data Model

#### 3.2.1 Rating Data Structure
```typescript
interface RatingData {
  version: number;                    // Schema version for future migrations
  ratings: Record<string, NoteRating>; // Map of noteId -> NoteRating
}

interface NoteRating {
  noteId: string;                     // Unique note identifier
  ratings: UserRating[];              // Array of individual user ratings
  averageRating: number;              // Calculated average (1-5)
  lastModified: number;               // Unix timestamp
}

interface UserRating {
  userId: string;                     // User identifier
  userName: string;                   // Display name
  rating: number;                     // 1-5 stars
  timestamp: number;                  // Unix timestamp
}
```

#### 3.2.2 Plugin Configuration Structure
```typescript
interface PluginConfig {
  ratingSystem: 'stars-5';            // Current: 'stars-5', Future: 'stars-10', 'thumbs', 'numeric'
  enableCollaboration: boolean;       // Show other users' ratings
  showAverageFirst: boolean;          // Display average prominently
  allowAnonymous: boolean;            // Allow anonymous ratings (future)
  data: RatingData;                   // The actual rating data
}
```

### 3.3 Storage Strategy

#### Option A: Plugin Configuration API (Recommended)
**Pros:**
- Built-in persistence via `window.Blinko.api.config.setPluginConfig`
- Automatic sync with Blinko's backend
- No additional infrastructure needed
- Works with existing authentication

**Cons:**
- May have size limitations (TBD - needs testing)
- All ratings stored in one config blob (needs efficient querying)

**Implementation:**
```typescript
// Save ratings
await window.Blinko.api.config.setPluginConfig.mutate({
  pluginName: 'blinko-rating-plugin',
  key: 'ratings',
  value: JSON.stringify(ratingData)
});

// Load ratings
const config = await window.Blinko.api.config.getPluginConfig.query({
  pluginName: 'blinko-rating-plugin'
});
const ratingData = JSON.parse(config.ratings);
```

#### Option B: Note Metadata (If Supported)
**Question for User:** Does Blinko support custom metadata fields on notes? If yes, we could store ratings directly in note metadata:
```typescript
note.metadata.ratings = {
  userId: 'user123',
  rating: 5,
  timestamp: 1234567890
}
```

This would be ideal for data locality and querying, but requires Blinko API support.

### 3.4 Plugin Integration Points

#### 3.4.1 Note Card Enhancement
**Challenge:** The plugin API doesn't currently expose a direct way to inject UI into note cards.

**Potential Solutions:**
1. **DOM Manipulation** (Not recommended - fragile)
   - Query for note card elements
   - Inject rating component
   - Risk of breaking with Blinko updates

2. **Request Blinko Feature** (Recommended)
   - Propose new plugin API: `addNoteCardWidget()`
   - Similar to `addToolBarIcon` but for note cards
   - Example:
   ```typescript
   window.Blinko.addNoteCardWidget({
     name: 'rating',
     position: 'bottom',
     render: (note) => <StarRating noteId={note.id} />
   });
   ```

3. **Alternative UI Locations** (Interim Solution)
   - Right-click menu option: "Rate this note"
   - Toolbar button that opens rating dialog
   - Side panel showing ratings

**Question for User:** Would you be okay with using right-click menu + dialog as an interim solution until Blinko adds native note card widget support?

#### 3.4.2 Filter & Sort Integration
**Challenge:** Unknown if plugin API supports modifying note list filtering/sorting.

**Research Needed:**
- Can plugins access the note list store?
- Can plugins add custom filter options?
- Is there a `window.Blinko.addFilter()` API?

**Fallback Options:**
1. Create a dedicated "Rated Notes" view in a plugin dialog/panel
2. Use toolbar button to open sortable/filterable list
3. Export ratings data for external analysis

---

## 4. Implementation Plan

### 4.1 Phase 1: Core Rating Functionality (MVP)
**Goal:** Enable users to rate notes and persist ratings

**Tasks:**
1. Set up data models and TypeScript interfaces
2. Create StarRating component (1-5 emoji stars: ★/☆)
3. Implement rating service (save/load via plugin config API)
4. Add right-click menu option: "Rate this note"
5. Create rating dialog with current rating display
6. Test data persistence and loading
7. Add user identification (from Blinko auth)

**Deliverables:**
- Users can rate notes via right-click menu
- Ratings persist across sessions
- Personal ratings are saved and displayed

### 4.2 Phase 2: Collaborative Ratings
**Goal:** Show aggregate ratings and voter breakdown

**Tasks:**
1. Implement aggregate calculation logic
2. Update UI to show personal vs. aggregate view
3. Add voter list display (expandable/collapsible)
4. Handle rating conflicts and sync
5. Add real-time updates (if supported by Blinko)
6. Test with multiple users

**Deliverables:**
- Multi-user rating support
- Aggregate display with voter breakdown
- Real-time or near-real-time sync

### 4.3 Phase 3: Enhanced UI Integration
**Goal:** Integrate rating UI directly into note cards

**Tasks:**
1. Research Blinko core code for extension points
2. Submit feature request for `addNoteCardWidget` API
3. If approved, implement native integration
4. If not, implement optimized DOM-based solution with safety checks
5. Add inline editing (click star on card to rate)

**Deliverables:**
- Ratings visible on note cards without extra clicks
- Seamless user experience

### 4.4 Phase 4: Filtering & Sorting
**Goal:** Enable users to filter and sort notes by rating

**Tasks:**
1. Research Blinko's filtering/sorting API
2. Implement custom filter UI (if no native support)
3. Add filter options:
   - Rated vs. Unrated
   - Minimum rating threshold
   - My highest rated
   - Most controversial (biggest rating spread)
4. Add sort options:
   - Highest rated first
   - Lowest rated first
   - Recently rated
5. Create dedicated "Ratings Dashboard" view

**Deliverables:**
- Functional filtering and sorting
- Dashboard with rating statistics

### 4.5 Phase 5: Future Enhancements
**Goal:** Extensibility and advanced features

**Tasks:**
1. Support multiple rating systems (configurable in settings)
2. Rating categories (e.g., importance, quality, relevance)
3. Rating reminders/prompts
4. Export ratings data (CSV, JSON)
5. Rating analytics (trends, most rated, etc.)
6. Bulk operations (rate multiple notes)
7. Rating templates/presets

---

## 5. Open Questions & Decisions Needed

### 5.1 Technical Questions
1. **Note Card Integration:** Accept interim solution (right-click + dialog) or wait for native API?
2. **Storage Limits:** Test plugin config API size limits - how many ratings can we store?
3. **User Identification:** How does Blinko identify users? Do we get userId/userName from auth?
4. **Real-time Sync:** Does Blinko support WebSocket/polling for real-time config updates?
5. **Note Lifecycle:** Do notes have unique, stable IDs we can rely on?

### 5.2 UX Questions
1. Should ratings be required or optional?
2. Should users be able to remove their rating (set to "unrated")?
3. What happens if a note is deleted? Auto-cleanup ratings data?
4. Should we show rating statistics (e.g., "You've rated 45 notes")?
5. Privacy: Can users hide their ratings from others in collaborative mode?

### 5.3 Feature Prioritization
1. Which phases are must-haves for v1.0?
2. Is collaborative rating essential for first release?
3. Should we focus on UI quality over feature completeness?

---

## 6. Success Metrics

### 6.1 Functional Metrics
- Users can successfully rate notes
- Ratings persist and sync correctly
- No data loss or corruption
- Performance: Rating action completes in <200ms

### 6.2 User Experience Metrics
- Rating requires ≤2 clicks (goal: 1 click inline)
- Clear visual feedback on rating state
- Intuitive aggregate display
- No confusion between personal and collaborative modes

### 6.3 Adoption Metrics
- % of notes rated by active users
- Average ratings per user per week
- Feature usage (filter/sort/dashboard)

---

## 7. Risk Assessment

### 7.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Plugin config size limits | High | Medium | Implement data archiving; request increased limits |
| No note card widget API | Medium | High | Use right-click interim solution; submit feature request |
| Breaking Blinko updates | Medium | Medium | Version pinning; active monitoring of Blinko releases |
| Slow performance with many ratings | Medium | Low | Optimize data structure; implement pagination |
| User ID changes/conflicts | High | Low | Research Blinko's auth system; add ID validation |

### 7.2 UX Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Users don't discover rating feature | High | Medium | Onboarding tooltip; prominent UI placement |
| Confusion in collaborative mode | Medium | Medium | Clear labeling; user testing; tutorial |
| Rating fatigue (too many prompts) | Low | Low | Make ratings optional; no intrusive prompts |

---

## 8. Dependencies

### 8.1 Blinko Core Dependencies
- Plugin Config API (`setPluginConfig`, `getPluginConfig`)
- Note object structure and ID stability
- User authentication and identification
- TRPC API for data operations

### 8.2 External Dependencies
- Preact (already included in template)
- TypeScript for type safety
- Native emoji stars (★/☆ or ⭐) - no icon library needed

### 8.3 Documentation Dependencies
- Blinko plugin API documentation
- Blinko type definitions
- Community examples

---

## 9. Next Steps

### 9.1 Immediate Actions
1. **Answer open questions** (see Section 5)
2. **Research note structure:** Inspect Note object in dev tools during right-click
3. **Test storage limits:** Write test script to check plugin config capacity
4. **Prototype StarRating component:** Create basic UI component
5. **Set up project structure:** Create folders for components, services, types

### 9.2 Before Development
1. Validate technical approach with Blinko community/maintainers
2. Create wireframes/mockups for rating UI
3. Define exact data schema with TypeScript types
4. Set up testing strategy
5. Review and approve this design document

---

## 10. Appendix

### 10.1 Alternative Approaches Considered

#### Approach 1: External Database
Store ratings in a separate database (Firebase, Supabase, etc.)
- **Pros:** No storage limits, advanced querying, real-time sync
- **Cons:** Additional infrastructure, auth complexity, cost
- **Verdict:** Rejected for MVP; keep it simple with Blinko's built-in storage

#### Approach 2: Tags as Ratings
Use Blinko tags like `#rating-5` to represent ratings
- **Pros:** No custom storage needed, works with existing filters
- **Cons:** Clutters tags, no user attribution, not truly collaborative
- **Verdict:** Rejected; doesn't meet collaboration requirement

#### Approach 3: Comments as Ratings
Post rating as a comment on the note
- **Pros:** Uses existing comment system, visible to all
- **Cons:** Clutters comments, hard to parse/aggregate, not designed for this
- **Verdict:** Rejected; poor UX for rating use case

### 10.2 Future Rating Systems

| System | Description | Use Case |
|--------|-------------|----------|
| 10-star | More granular ratings | Users who need finer distinctions |
| Thumbs up/down | Simple binary rating | Quick triage/approval workflows |
| Multiple criteria | Rate on different dimensions (importance, quality, etc.) | Complex evaluation needs |
| Emoji reactions | Fun, expressive ratings | Casual/social environments |
| Numeric score | Open-ended numeric value | Quantitative analysis |

### 10.3 References
- [Blinko Plugin API](https://blinko.mintlify.app/en/plugins/api-reference)
- [Blinko Plugin Store](https://blinko.mintlify.app/en/plugins/store)
- [Blinko Getting Started](https://blinko.mintlify.app/en/plugins/get-started)
- [Plugin Template Repository](https://github.com/blinko-space/blinko-plugin-template)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-27
**Author:** Design discussion with user
**Status:** Draft - Awaiting feedback and approval
