import { toRoman } from "./helpers";
import type { SieglindeCalculations, Tier } from "./NetworkModels";

export type RankInfo =
    | { ranked: false }
    | {
        ranked: true;
        tier: Tier;
        tierIndex: number;
        division: number | null;
        label: string;
        siegRating: { symbol: string, level: number }
        progress: { start: number; end: number; percent: number; division: number } | null;
        next: { label: string; at: number } | null;
    }

export type Step = { rating: number, tierIndex: number; divisionNumber: number; from: number; to: number };

const DIVISIONS = 5;

export function getRankInfo(tiers: Tier[], siegCalcs: SieglindeCalculations, rating: number | null, placed = true): RankInfo {
    if (rating == null || placed === false || rating === -1) return { ranked: false }

    const tierIndex = findTierIndex(tiers, rating);
    if (tierIndex == null) return { ranked: false }

    const tier = tiers[tierIndex];
    const progress = calculateDivisionProgress(tiers, rating, tierIndex);
    const division = progress?.division ?? null;

    let next = null;
    if (progress) {
        const nextIndex = findTierIndex(tiers, progress.end);
        if (nextIndex != null) {
            const nextDiv = calculateDivisionProgress(tiers, progress.end, nextIndex)?.division ?? null;
            next = { label: `${tiers[nextIndex].name} ${nextDiv ? toRoman(nextDiv) : ""}`.trim(), at: progress.end }
        }
    }

    return {
        ranked: true,
        tier, tierIndex, division, progress, next,
        label: `${tier.name} ${division ? toRoman(division) : ""}`.trim(),
        siegRating: eloToSieg(rating, siegCalcs)
    }
}

export function findTierIndex(tiers: Tier[], rating: number) {
    const i = tiers.findLastIndex((t) => rating >= t.floor);
    return i === -1 ? null : i;
}

export function calculateDivisionProgress(tiers: Tier[], rating: number, index: number) {
  if (index === tiers.length - 1) return null;   // Grandmaster: no divisions

  const tierFloor = tiers[index].floor;
  const width = (tiers[index + 1].floor - tierFloor) / DIVISIONS;

  let steps = Math.floor((rating - tierFloor) / width);
  steps = Math.max(0, Math.min(steps, DIVISIONS - 1));

  const start = tierFloor + steps * width;
  const end = start + width;
  const percent = Math.max(0, Math.min(100, ((rating - start) / (end - start)) * 100));
  const division = DIVISIONS - steps;

  return { start, end, percent, division };
}

export function eloToSieg(elo: number, sieglindeCalcs: SieglindeCalculations) {
  const unified = (elo - sieglindeCalcs.elo_base) / sieglindeCalcs.elo_per_level
  const symbol = unified < 13 ? "☆" : "★";
  const level = unified < 13 ? unified : unified - 12;

  return { symbol, level }
}

export function buildSteps(oldR: number, newR: number, tiers: Tier[]): Step[] {

  const steps: Step[] = [];
  const up = newR >= oldR;
  let r = oldR;
  
  while (true) {
    const tierIndex = findTierIndex(tiers, r) ?? 0;

    if (tierIndex == tiers.length - 1) {
      return [...steps, { rating: r, tierIndex: tierIndex, divisionNumber: 0, from: 0, to: 0 }]
    }
    
    const progress = calculateDivisionProgress(tiers, r, tierIndex);
    if (!progress) return steps;   // unranked / no divisions: nothing to animate

    const divisionNumber = progress.division;

    const { start, end } = progress;
    const pct = (x: number) => ((x - start) / (end - start)) * 100;

    const target = up ? Math.min(newR, end) : Math.max(newR, start);
    steps.push({ rating: r, tierIndex, divisionNumber, from: pct(r), to: pct(target) });

    if (target === newR) return steps;
    r = up ? end : start - 0.001;
  }
}