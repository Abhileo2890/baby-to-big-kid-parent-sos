export type AgeGroupId = '6-12-months' | '12-24-months' | '2-3-years' | '3-4-years';

export type ChallengeCategoryId =
  | 'sleep'
  | 'care-routines'
  | 'big-feelings'
  | 'separation'
  | 'feeding'
  | 'social-development';

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface ChallengeCategory {
  id: ChallengeCategoryId;
  label: string;
  description: string;
}

export interface RelatedVideo {
  title: string;
  description: string;
  youtubeUrl: string;
}

export interface GuidanceSections {
  why: string[];
  tryNow: string[];
  avoid: string[];
  words: string[];
  pediatrician: string[];
}

export interface AgeSpecificGuidance {
  ageGroupId: AgeGroupId;
  sections: GuidanceSections;
  relatedVideo: RelatedVideo;
}

export interface ParentingChallenge {
  id: string;
  title: string;
  categoryId: ChallengeCategoryId;
  summary: string;
  ageGroupIds: AgeGroupId[];
  guidance: AgeSpecificGuidance[];
}
