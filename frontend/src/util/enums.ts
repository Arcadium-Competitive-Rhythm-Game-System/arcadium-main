export const ClearType = {
    ASSIST_CLEAR: "ASSIST CLEAR",
    EASY_CLEAR: "EASY CLEAR",
    CLEAR: "CLEAR",
    HARD_CLEAR: "HARD CLEAR",
    EX_HARD_CLEAR: "EX HARD CLEAR",
    FULL_COMBO: "FULL COMBO"
} as const

export type ClearType = typeof ClearType[keyof typeof ClearType]