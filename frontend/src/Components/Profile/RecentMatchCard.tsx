import { cn } from "../../util/helpers";

interface RecentMatchCardProps {
    className?: string;
}

export default function RecentMatchCard({ className }: RecentMatchCardProps) {
    return (
        <div className={cn("flex flex-row gap-4 items-center", className)}>
            <span
            className={`size-10 shrink-0 flex items-center justify-center rounded-[5px] border font-mono font-bold ${"border-green-400 bg-green-400/15 text-green-400"
            }`}
            >
            W
            </span>    

            <div className="flex-1 flex-col">
                <p className="font-sanchez">[Chart Title]</p>
                <p className="font-sanchez text-sm text-subtext">Failed &middot; 2h ago</p>
            </div>

            <p className="border border-zinc-400/50 p-2 rounded-xl font-sanchez text-sm">sl3</p>
            <p className="font-mono text-green-400">+22</p>
        </div>
    )
}