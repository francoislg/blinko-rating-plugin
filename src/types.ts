export interface Note {
  tags: Array<{
    id: number;
    noteId: number;
    tagId: number;
    tag: Tag;
  }>;
  metadata?: {
    ratings?: Record<string, Record<string, number>>; // guid -> { userId -> rating }
  };
  _id: string;
  id: string;
}

export interface Tag {
  id: number;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  sortOrder: number;
  parent: number;
}

export type RatingDisplayType = "stars" | "upvotes";

export type TagFilterMode = "whitelist" | "blacklist";

export interface RatingConfig {
  guid: string;
  name: string;
  type: RatingDisplayType;
  enabled: boolean;
  mode: TagFilterMode;
  tags: string[];
  label?: string;
}

export interface PluginConfig {
  ratings: RatingConfig[];
}

export interface NoteRatingData {
  userRating: number;
  averageRating: number;
  voteCount: number;
  allRatings: Record<string, number>;
}
