import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";

interface ProfileStatRowProps {
    className?: string;
    matchCount: number;
    wins: number;
}

export default function ProfileStatRow({ className, matchCount, wins }: ProfileStatRowProps) {

    const winRate = matchCount > 0 ? (wins / matchCount) * 100 : 0

    return (
        <div className={cn("flex flex-row gap-5", className)}>
            <ForegroundCard className="flex-1 flex flex-col gap-3">
                <p className="font-archivo tracking-[0.2em] text-subtext">MATCHES</p>
                <p className="font-mono text-xl font-extrabold tracking-widest">{matchCount}</p>
                <p className="font-sanchez text-sm text-subtext">Ranked only</p>
            </ForegroundCard>
            <ForegroundCard className="flex-1 flex flex-col gap-3">
                <p className="font-archivo tracking-[0.2em] text-subtext">WIN RATE</p>
                <p className="font-mono text-xl font-extrabold tracking-widest">{winRate.toFixed(0)}%</p>
                <p className="font-sanchez text-sm text-subtext">W {wins} &middot; L {matchCount - wins}</p>
            </ForegroundCard>
        </div>
    )
}