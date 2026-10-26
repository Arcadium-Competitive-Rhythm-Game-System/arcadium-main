import { useRank } from "../../hooks/useTiers";
import { cn, timeAgo, toFixedTruncated } from "../../util/helpers";
import type { ProfileRating } from "../../util/NetworkModels";
import ForegroundCard from "../General/ForegroundCard";
import { QueueIcon } from "../Home/QueueCard";

interface ProfileTierCardProps {
    className?: string;
    rating: ProfileRating
    rank: number;
    total: number;
    lastPlayed?: string | null;
}

export default function ProfileTierCard({ className, rating, rank, total, lastPlayed }: ProfileTierCardProps) {
    const peakRating = useRank(rating.peak_rating, rating.placed)

    return (
        <div className={cn("w-full", className)}>
            <ForegroundCard>
                <QueueIcon 
                placed={rating.placed}
                rating={rating.display_rating}
                displayProgress={true}
                displayRating={true}
                />

                <hr className="my-4 text-zinc-500/50" />

                <div className="flex flex-col gap-3 font-sanchez">
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Peak</p>
                        <p className="font-mono">{`${peakRating?.ranked ? peakRating.label : "Unranked"}`} &middot; {peakRating?.ranked ? toFixedTruncated(rating.peak_rating, 0) : "---"}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Rank</p>
                        <p className="font-mono">#{rank} of {total}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Last Played</p>
                        <p>{lastPlayed ? timeAgo(lastPlayed) : "never"}</p>
                    </div>

                </div>
            </ForegroundCard>
        </div>
    )
}