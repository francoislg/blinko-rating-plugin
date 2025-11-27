export interface Note {
  tags: Array<{
    id: number;
    noteId: number;
    tagId: number;
    tag: Tag;
  }>;
  metadata?: {
    starRatings?: Record<string, number>;
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

export type RatingType = "stars";

export type TagFilterMode = "whitelist" | "blacklist";

export interface RatingTypeConfig {
  enabled: boolean;
  mode: TagFilterMode;
  tags: string[];
}

export interface NoteRatingData {
  userRating: number;
  averageRating: number;
  voteCount: number;
  allRatings: Record<string, number>;
}
