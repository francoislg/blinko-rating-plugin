import { RatingPluginConfiguration } from "./rating-config";
import type { Note, NoteRatingData, RatingType } from "./types";

export class RatingPluginData {
  constructor(private config: RatingPluginConfiguration) {}

  private getRatingsFromMetadata(
    note: Note,
    ratingType: RatingType
  ): Record<string, number> {
    if (ratingType === "stars") {
      if (!note?.metadata?.starRatings) {
        return {};
      }
      return note.metadata.starRatings;
    }
    return {};
  }

  getRating(note: Note, ratingType: RatingType): number {
    const userId = this.config.getUserId();
    const ratings = this.getRatingsFromMetadata(note, ratingType);
    return ratings[userId] || 0;
  }

  getAverageRating(note: Note, ratingType: RatingType): number {
    const ratings = this.getRatingsFromMetadata(note, ratingType);
    const values = Object.values(ratings);

    if (values.length === 0) {
      return 0;
    }

    const sum = values.reduce((acc, rating) => acc + rating, 0);
    return sum / values.length;
  }

  getVoteCount(note: Note, ratingType: RatingType): number {
    const ratings = this.getRatingsFromMetadata(note, ratingType);
    return Object.keys(ratings).length;
  }

  getAllRatings(note: Note, ratingType: RatingType): Record<string, number> {
    return this.getRatingsFromMetadata(note, ratingType);
  }

  getRatingForNote(note: Note, ratingType: RatingType): NoteRatingData {
    return {
      userRating: this.getRating(note, ratingType),
      averageRating: this.getAverageRating(note, ratingType),
      voteCount: this.getVoteCount(note, ratingType),
      allRatings: this.getAllRatings(note, ratingType),
    };
  }

  async saveRating(
    note: Note,
    ratingType: RatingType,
    rating: number
  ): Promise<void> {
    const userId = this.config.getUserId();
    const noteId = note.id?.toString() || note._id?.toString();

    const currentRatings = this.getRatingsFromMetadata(note, ratingType);
    const updatedRatings = { ...currentRatings };

    if (rating === 0) {
      delete updatedRatings[userId];
    } else {
      updatedRatings[userId] = rating;
    }

    const metadataKey = ratingType === "stars" ? "starRatings" : "ratings";
    const updatedMetadata = {
      ...(note.metadata || {}),
      [metadataKey]: updatedRatings,
    };

    try {
      await window.Blinko.api.notes.upsert.mutate({
        id: Number(noteId),
        metadata: updatedMetadata,
      });
    } catch (error) {
      console.error("Failed to save rating:", error);
      throw error;
    }
  }

  private shouldShowRatingType(note: Note, ratingType: RatingType): boolean {
    const config = this.config.getConfig(ratingType);

    if (!config.enabled) {
      return false;
    }

    if (!note.tags || note.tags.length === 0) {
      return config.mode === "blacklist" || config.tags.length === 0;
    }

    const noteTags = Array.isArray(note.tags)
      ? note.tags.map((t) =>
          typeof t === "object" && "tag" in t ? t.tag.name : String(t)
        )
      : [];

    if (config.mode === "whitelist") {
      if (config.tags.length === 0) {
        return true;
      }
      return noteTags.some((tag: string) => config.tags.includes(tag));
    } else {
      if (config.tags.length === 0) {
        return true;
      }
      return !noteTags.some((tag: string) => config.tags.includes(tag));
    }
  }

  getRatingsToDisplay(note: Note): RatingType[] {
    const allRatingTypes: RatingType[] = ["stars"];
    return allRatingTypes.filter((ratingType) =>
      this.shouldShowRatingType(note, ratingType)
    );
  }
}
