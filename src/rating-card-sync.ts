import type { Note, RatingConfig } from "./types";

/**
 * Determines if a rating should be shown on a note based on the rating config's tag filtering rules.
 */
export function shouldShowRating(
  note: Note,
  ratingConfig: RatingConfig
): boolean {
  if (!ratingConfig.enabled) {
    return false;
  }

  if (!note.tags || note.tags.length === 0) {
    return ratingConfig.mode === "blacklist" || ratingConfig.tags.length === 0;
  }

  if (ratingConfig.mode === "whitelist") {
    if (ratingConfig.tags.length === 0) {
      return true;
    }
    return note.tags.some((tag) => ratingConfig.tags.includes(tag.tag.name));
  } else {
    if (ratingConfig.tags.length === 0) {
      return true;
    }
    return !note.tags.some((tag) => ratingConfig.tags.includes(tag.tag.name));
  }
}

/**
 * Syncs rating configurations to all notes based on tag filtering rules.
 * - Updates existing rating configs on notes if they still match the filter criteria (only for current user's configs)
 * - Adds new rating configs to notes if they match the filter criteria
 * - Removes rating configs from notes if they no longer match the filter criteria (only for current user's configs)
 * - Preserves rating configs created by other users
 */
export async function syncRatingConfigsToAllNotes(
  configs: RatingConfig[]
): Promise<void> {
  const currentUserId =
    window.Blinko.store.userStore.id?.toString() || "anonymous";

  const allNotes = await window.Blinko.api.notes.list.mutate({
    searchText: "",
    isArchived: false,
  });

  const configMap = new Map(configs.map((c) => [c.guid, c]));
  const notesArray = Array.isArray(allNotes) ? allNotes : allNotes?.list || [];

  for (const note of notesArray) {
    const currentMetadata = (note.metadata?.ratingConfigs || {}) as Record<
      string,
      any
    >;
    const newMetadata: Record<string, any> = {};

    // Process existing configs
    for (const guid in currentMetadata) {
      const existingConfig = currentMetadata[guid];
      const createdBy = existingConfig.createdBy;

      // If this config was created by another user, preserve it as-is
      if (createdBy && createdBy !== currentUserId) {
        newMetadata[guid] = existingConfig;
        continue;
      }

      // If this config was created by current user (or no createdBy field - legacy data)
      // Update it if it still matches the filter criteria
      const config = configMap.get(guid);
      if (config && shouldShowRating(note, config)) {
        newMetadata[guid] = {
          enabled: config.enabled,
          type: config.type,
          label: config.label,
          ratings: existingConfig.ratings || {},
          createdBy: currentUserId,
        };
      }
      // If it doesn't match criteria anymore, it will be removed (not added to newMetadata)
    }

    // Add new configs if they match the filter criteria
    for (const config of configs) {
      if (!newMetadata[config.guid] && shouldShowRating(note, config)) {
        newMetadata[config.guid] = {
          enabled: config.enabled,
          type: config.type,
          label: config.label,
          ratings: {},
          createdBy: currentUserId,
        };
      }
    }

    const noteId = note.id || note._id;
    if (!noteId) continue;

    await window.Blinko.api.notes.upsert.mutate({
      id: typeof noteId === "string" ? parseInt(noteId, 10) : noteId,
      metadata: {
        ...note.metadata,
        ratingConfigs: newMetadata,
      },
    });
  }
}
