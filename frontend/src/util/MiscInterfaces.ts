export interface TierProgressData {
    tierIndex: number;
    division: number;
    progress: number;
}

export interface BetweenTierData {
    startingProgress: TierProgressData;
    endingProgress: TierProgressData
}

export interface TableInfo {
    tableIcon: string;
    tableName: string;
    category: TableCategory
}

export type TierName =
  | "Copper" | "Bronze" | "Silver" | "Gold" | "Platinum"
  | "Emerald" | "Diamond" | "Master" | "Grandmaster";

export interface Milestone {
  tierName: TierName;
  value: number;
}

type MilestoneOf<N extends TierName> = { tierName: N; value: number };

export type MilestoneLadder = readonly [
  MilestoneOf<"Copper">,
  MilestoneOf<"Bronze">,
  MilestoneOf<"Silver">,
  MilestoneOf<"Gold">,
  MilestoneOf<"Platinum">,
  MilestoneOf<"Emerald">,
  MilestoneOf<"Diamond">,
  MilestoneOf<"Master">,
  MilestoneOf<"Grandmaster">,
];

export type TableCategory = "general" | "skillset"

export interface ActivityData {
  date: string;
  count: number;
  level: number;
}