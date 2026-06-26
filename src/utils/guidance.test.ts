import { describe, expect, it, beforeEach } from 'vitest';
import { filterChallengesByCategory, findChallengeById, getChallengesForAge, restoreSelectedAgeGroup, saveSelectedAgeGroup, searchChallenges } from './guidance';

describe('guidance data helpers', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        clear: () => store.clear(),
        removeItem: (key: string) => store.delete(key),
      },
      configurable: true,
    });
  });

  it('filters challenges by age', () => {
    expect(getChallengesForAge('6-12-months').map((challenge) => challenge.id)).toContain('wakes-when-put-down');
    expect(getChallengesForAge('3-4-years')).toHaveLength(6);
  });

  it('searches challenges', () => {
    const results = searchChallenges(getChallengesForAge('12-24-months'), 'diaper');
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('refuses-diaper-changes');
  });

  it('filters by category', () => {
    const results = filterChallengesByCategory(getChallengesForAge('2-3-years'), 'feeding');
    expect(results.map((challenge) => challenge.id)).toEqual(['throws-food']);
  });

  it('finds a challenge by its ID', () => {
    expect(findChallengeById('meltdowns-small-things')?.title).toBe('My child has meltdowns over small things');
  });

  it('handles an invalid challenge ID', () => {
    expect(findChallengeById('not-real')).toBeUndefined();
  });

  it('saves and restores the selected age group', () => {
    saveSelectedAgeGroup('2-3-years');
    expect(restoreSelectedAgeGroup()).toBe('2-3-years');
  });
});
