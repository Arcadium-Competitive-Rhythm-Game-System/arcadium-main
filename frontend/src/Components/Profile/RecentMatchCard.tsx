import { cn, timeAgo } from "../../util/helpers";
import type { Match } from "../../util/NetworkModels";

interface RecentMatchCardProps {
    className?: string;
    match: Match;
}

export default function RecentMatchCard({ className, match }: RecentMatchCardProps) {

    const delta =
    match.player_display_after != null
    ? Math.round(match.player_display_after - match.player_display_before)
    : null;

    return (
        <div className={cn("flex flex-row gap-4 items-center", className)}>
            <span
            key={match.id}
            className={`size-10 shrink-0 flex items-center justify-center rounded-[5px] border font-mono font-bold ${
                match.result === "win"
                ? "border-green-400 bg-green-400/15 text-green-400"
                : "border-red-400 bg-red-400/10 text-red-400"
            }`}
            >
            {match.result === "win" ? "W" : "L"}
            </span>  

            <div className="flex-1 flex-col">
                <p className="font-sanchez">[{match.chart.title}]</p>
                <p className="font-sanchez text-sm text-subtext">{match.score?.lamp ?? "NO PLAY"} &middot; {timeAgo(match.end_time ?? "0")}</p>
            </div>

            {match.chart.table_levels.map(table => (
                <p className="border border-zinc-400/50 p-2 rounded-xl font-sanchez text-sm">{table.table_icon}{table.table_level}</p>
            ))}
            
            {delta !== null && (
            <p className={`font-mono ${delta >= 0 ? "text-green-400" : "text-red-400"}`}>
                {delta >= 0 ? "+" : ""}{delta}
            </p>
            )}
            
        </div>
    )
}