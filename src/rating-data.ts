import { RatingPluginConfiguration } from "./rating-config";
import type { Note, NoteRatingData, RatingConfig } from "./types";

export class RatingPluginData {
  constructor(private config: RatingPluginConfiguration) {}

  private getRatingsFromMetadata(
    note: Note,
    guid: string
  ): Record<string, number> {
    if (!note?.metadata?.ratingConfigs?.[guid]) {
      return {};
    }
    return note.metadata.ratingConfigs[guid].ratings || {};
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

  async saveRating(note: Note, guid: string, rating: number): Promise<void> {
    const userId = this.config.getUserId();
    const noteId = note.id?.toString() || note._id?.toString();

    const currentRatings = this.getRatingsFromMetadata(note, guid);
    const updatedRatings = { ...currentRatings };

    if (rating === 0) {
      delete updatedRatings[userId];
    } else {
      updatedRatings[userId] = rating;
    }

    const currentRatingConfigs = note.metadata?.ratingConfigs || {};
    const currentConfig = currentRatingConfigs[guid];

    if (!currentConfig) {
      throw new Error(
        `Rating configuration with guid ${guid} not found in note metadata`
      );
    }

    const updatedRatingConfigs = {
      ...currentRatingConfigs,
      [guid]: {
        ...currentConfig,
        ratings: updatedRatings,
        createdBy: currentConfig.createdBy || userId, // Preserve or set createdBy
      },
    };

    const updatedMetadata = {
      ...(note.metadata || {}),
      ratingConfigs: updatedRatingConfigs,
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
}
