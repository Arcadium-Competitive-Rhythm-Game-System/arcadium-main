import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type SieglindeCalculations, type Tier, type TierData } from "../util/NetworkModels";
import { api } from "../util/helpers";
import { getRankInfo, type RankInfo } from "../util/rank";

type TierState = {
    tiers: Tier[] | null;
    siegCalc: SieglindeCalculations | null;
    loading: boolean;
}

const TierContext = createContext<TierState | null>(null);

export function TierProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<TierData | null>(null);
    const [loading, setLoading] = useState(true);

    async function getTiers() {
        return api<TierData>("/info/tiers")
        .then(tierData => {
            setData(tierData);
        }).catch(() => {
            setData(null);
        }).finally(() => {
            setLoading(false)
        })
    }

    const value = useMemo(
        () => ({
            tiers: data?.tiers ?? null,
            siegCalc: data?.sieg_calc ?? null,
            loading,
        }),
        [data, loading]
    )

    useEffect(() => {
        getTiers()
    }, [])

    return (
        <TierContext.Provider value={value}>
            {children}
        </TierContext.Provider>
    )
}

export function useTiers() {
    const ctx = useContext(TierContext);
    if (!ctx) throw new Error("useTiers must be used inside TierProvider");
    return ctx;
}

export function useRank(rating: number | null, placed = true) : RankInfo | null {
    const { tiers, siegCalc } = useTiers();

    return useMemo(
        () => (tiers && siegCalc ? getRankInfo(tiers, siegCalc, rating, placed) : null), 
        [tiers, rating, placed]);
}