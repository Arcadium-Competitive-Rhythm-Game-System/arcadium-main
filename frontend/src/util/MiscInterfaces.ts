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

export type TableCategory = "general" | "skillset"