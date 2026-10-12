import { cn } from "../../util/helpers";
import type { Match } from "../../util/NetworkModels"

interface ScoreSummaryProps {
    match: Match
}

const LAMP_STYLES: Record<string, string> = {
  "FAILED":        "text-red-400 bg-red-500/10 border-red-500/40",
  "ASSIST CLEAR":  "text-purple-300 bg-purple-500/10 border-purple-500/40",
  "EASY CLEAR":    "text-green-400 bg-green-500/10 border-green-500/40",
  "CLEAR":         "text-sky-300 bg-sky-500/10 border-sky-500/40",
  "HARD CLEAR":    "text-orange-300 bg-orange-500/10 border-orange-500/40",
  "EX HARD CLEAR": "text-yellow-300 bg-yellow-500/10 border-yellow-500/40",
  "FULL COMBO":    "text-cyan-200 bg-cyan-400/10 border-cyan-300/50",
};

function Stat({ label, value } : { label: string, value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="font-archivo text-[11px] tracking-[0.2em] text-subtext">{label}</span>
            <span className="font-mono text-2xl font-bold tabular-nums">{value}</span>
        </div>
    )
}

export default function ScoreSummary({ match }: ScoreSummaryProps) {

    if (!match.score)
        return (<>Loading Score</>)

    return (
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-0 p-3">
            {/* <div>
                <p className="font-archivo tracking-widest font-bold text-2xl">{match.score?.lamp} | {match.score?.grade} | <span className="font-mono tracking-[0.2em]">{match.score?.percent.toFixed(2)}%</span> | {match.score?.bp} BP</p>
            </div> */}

            <div className={cn(
                "w-full lg:w-auto flex items-center justify-center lg:justify-start lg:mr-5 px-4 py-2 rounded-md border font-archivo font-extrabold tracking-[0.15em] text-sm",
                LAMP_STYLES[match.score.lamp]
            )}>{match.score.lamp}</div>

            <div className="hidden lg:block w-px self-stretch bg-zinc-600 mr-5" />

            <div className="flex gap-10">
                <Stat label={"GRADE"} value={match.score.grade} />
                <Stat label={"ACCURACY"} value={`${match.score.percent.toFixed(2)}%`} />
                <Stat label={"BP"} value={match.score.bp ?? "---"} />
            </div>
        </div> 
    )
}