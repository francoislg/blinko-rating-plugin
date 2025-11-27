import { RatingPluginConfiguration } from "./rating-config";
import type { Note, NoteRatingData, RatingConfig } from "./types";

export class RatingPluginData {
  constructor(private config: RatingPluginConfiguration) {}

  private getRatingsFromMetadata(
    note: Note,
    guid: string
  ): Record<string, number> {
    if (!note?.metadata?.ratings) {
      return {};
    }
    return note.metadata.ratings[guid] || {};
  }

  getRating(note: Note, guid: string): number {
    const userId = this.config.getUserId();
    const ratings = this.getRatingsFromMetadata(note, guid);
    return ratings[userId] || 0;
  }

  getAverageRating(note: Note, guid: string): number {
    const ratings = this.getRatingsFromMetadata(note, guid);
    const values = Object.values(ratings);

    if (values.length === 0) {
      return 0;
    }

    const sum = values.reduce((acc, rating) => acc + rating, 0);
    return sum / values.length;
  }

  getVoteCount(note: Note, guid: string): number {
    const ratings = this.getRatingsFromMetadata(note, guid);
    return Object.keys(ratings).length;
  }

  getAllRatings(note: Note, guid: string): Record<string, number> {
    return this.getRatingsFromMetadata(note, guid);
  }

  getRatingForNote(note: Note, guid: string): NoteRatingData {
    return {
      userRating: this.getRating(note, guid),
      averageRating: this.getAverageRating(note, guid),
      voteCount: this.getVoteCount(note, guid),
      allRatings: this.getAllRatings(note, guid),
    };
  }

  async saveRating(
    note: Note,
    guid: string,
    rating: number
  ): Promise<void> {
    const userId = this.config.getUserId();
    const noteId = note.id?.toString() || note._id?.toString();

    const currentRatings = this.getRatingsFromMetadata(note, guid);
    const updatedRatings = { ...currentRatings };

    if (rating === 0) {
      delete updatedRatings[userId];
    } else {
      updatedRatings[userId] = rating;
    }

    const allRatings = {
      ...(note.metadata?.ratings || {}),
      [guid]: updatedRatings,
    };

    const updatedMetadata = {
      ...(note.metadata || {}),
      ratings: allRatings,
    };

    try {
      await window.Blinko.api.notes.upsert.mutate({
        id: Number(noteId),
        metadata: updatedMetadata,
      });
    } catch (error) {
      throw error;
    }
  }

  private shouldShowRating(note: Note, ratingConfig: RatingConfig): boolean {
    if (!ratingConfig.enabled) {
      return false;
    }

    if (!note.tags || note.tags.length === 0) {
      return ratingConfig.mode === "blacklist" || ratingConfig.tags.length === 0;
    }

    const noteTags = Array.isArray(note.tags)
      ? note.tags.map((t) =>
          typeof t === "object" && "tag" in t ? t.tag.name : String(t)
        )
      : [];

    if (ratingConfig.mode === "whitelist") {
      if (ratingConfig.tags.length === 0) {
        return true;
      }
      return noteTags.some((tag: string) => ratingConfig.tags.includes(tag));
    } else {
      if (ratingConfig.tags.length === 0) {
        return true;
      }
      return !noteTags.some((tag: string) => ratingConfig.tags.includes(tag));
    }
  }

  getRatingsToDisplay(note: Note): string[] {
    const allConfigs = this.config.getAllConfigs();
    return allConfigs
      .filter((config) => this.shouldShowRating(note, config))
      .map((config) => config.guid);
  }
}
