import { cn } from "../../util/helpers";
import { GetNextTier, GetRatingForCount } from "../../util/milestoneDictionaries";
import type { MilestoneLadder, TierName } from "../../util/MiscInterfaces";
import ForegroundCard from "../General/ForegroundCard";
import ProgressBar from "../General/ProgressBar";
import { QueueIcon } from "../Home/QueueCard";

interface ProfileMilestoneCard {
    className?: string;
    milestoneName: string;
    milestoneLadder: MilestoneLadder;
    value: number;
    countTitle: string;
    descriptor: string;
}

const TIER_COLORS: Record<TierName, { main: string; light: string }> = {
  Copper:      { main: "#CC0000", light: "#E06666" },
  Bronze:      { main: "#E69138", light: "#F6B26B" },
  Silver:      { main: "#B7B7B7", light: "#D9D9D9" },
  Gold:        { main: "#F1C232", light: "#FFD966" },
  Platinum:    { main: "#3D85C6", light: "#6FA8DC" },
  Emerald:     { main: "#6AA84F", light: "#93C47D" },
  Diamond:     { main: "#674EA7", light: "#8E7CC3" },
  Master:      { main: "#434343", light: "#666666" },
  Grandmaster: { main: "#A64D79", light: "#C27BA0" },
};

export default function ProfileMilestoneCard({ className, milestoneName, countTitle, descriptor, milestoneLadder, value }: ProfileMilestoneCard) {

    const tier = GetRatingForCount(value, milestoneLadder);
    const floor = tier?.value ?? 0;
    const nextTier = GetNextTier(value, milestoneLadder);
    const nextTierText = nextTier ? nextTier.value - value : "Completed";
    const tierName = tier ? tier.tierName : "Unranked";
    const progress = nextTier
    ? ((value - floor) / (nextTier.value - floor)) * 100
    : 100;

    return (
        <ForegroundCard className={cn("flex flex-row gap-3", className)}>
            <div className="flex-1">
                <QueueIcon
                tierName={tierName}
                />
            </div>

            <div className="flex flex-col flex-2 justify-between self-stretch">
                <p className="font-archivo text-subtext tracking-[0.2em]">{milestoneName}</p>
                <hr className="text-zinc-500/50" />
                <p className="font-mono text-subtext">{value} {countTitle}</p>
                <ProgressBar
                value={progress}
                animate={false}
                durationMs={0}
                />
                <p className="font-sanchez text-subtext text-sm">{nextTierText} {nextTier ? ` more for ${nextTier.tierName}` : ""} &middot; {descriptor}</p>
                <div className="flex flex-row">
                    {
                        milestoneLadder.map(t => {
                            const reached = value >= t.value;
                            const c = TIER_COLORS[t.tierName].light;
                            return (
                                <div className="flex-1 flex justify-center">
                                    <div 
                                    className={"size-3 rotate-45 rounded-xs border-[1.5px] border-zinc-700"} 
                                    style={{
                                        backgroundColor: reached ? c : "transparent"
                                    }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </ForegroundCard>
    )
}