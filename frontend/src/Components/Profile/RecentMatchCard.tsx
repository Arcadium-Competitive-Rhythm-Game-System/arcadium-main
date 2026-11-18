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

    const badges = match.chart.table_levels.map(table => (
        <p
            key={`${table.table_icon}${table.table_level}`}
            className="border border-zinc-400/50 px-2 py-1 rounded-xl font-sanchez text-xs sm:text-sm sm:p-2"
        >
            {table.table_icon}{table.table_level}
        </p>
    ));

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
                <div className="flex gap-1.5 mt-1.5 sm:hidden">{badges}</div>
            </div>

            <div className="hidden sm:flex gap-2 shrink-0">{badges}</div>
            
            {delta !== null && (
            <p className={`font-mono ${delta >= 0 ? "text-green-400" : "text-red-400"}`}>
                {delta >= 0 ? "+" : ""}{delta}
            </p>
            )}
            
        </div>
    )
}