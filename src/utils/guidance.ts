import { ageGroups } from '../data/ageGroups';
import { challenges } from '../data/challenges';
import type { AgeGroupId, ChallengeCategoryId, ParentingChallenge } from '../data/types';

const storageKey = 'parent-sos-selected-age-group';

export const getChallengesForAge = (ageGroupId: AgeGroupId): ParentingChallenge[] =>
  challenges.filter((challenge) => challenge.ageGroupIds.includes(ageGroupId));

export const searchChallenges = (items: ParentingChallenge[], query: string): ParentingChallenge[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((challenge) =>
    `${challenge.title} ${challenge.summary}`.toLowerCase().includes(normalized),
  );
};

export const filterChallengesByCategory = (
  items: ParentingChallenge[],
  categoryId: ChallengeCategoryId | 'all',
): ParentingChallenge[] => (categoryId === 'all' ? items : items.filter((challenge) => challenge.categoryId === categoryId));

export const findChallengeById = (challengeId: string): ParentingChallenge | undefined =>
  challenges.find((challenge) => challenge.id === challengeId);

export const isAgeGroupId = (value: string | null): value is AgeGroupId =>
  ageGroups.some((ageGroup) => ageGroup.id === value);

const getBrowserStorage = (): Storage => globalThis.localStorage;

export const saveSelectedAgeGroup = (ageGroupId: AgeGroupId, storage: Storage = getBrowserStorage()): void => {
  storage.setItem(storageKey, ageGroupId);
};

export const restoreSelectedAgeGroup = (storage: Storage = getBrowserStorage()): AgeGroupId | null => {
  const stored = storage.getItem(storageKey);
  return isAgeGroupId(stored) ? stored : null;
};
