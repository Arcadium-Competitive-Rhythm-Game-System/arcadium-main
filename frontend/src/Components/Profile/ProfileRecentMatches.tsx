import { cn } from "../../util/helpers";
import type { Match } from "../../util/NetworkModels";
import ForegroundCard from "../General/ForegroundCard";
import RecentMatchCard from "./RecentMatchCard";

interface ProfileRecentMatches {
    className?: string;
    matches: Match[]
}

export default function ProfileRecentMatches({ className, matches }: ProfileRecentMatches) {
    return (
        <ForegroundCard className={cn("", className)}>
            <p className="font-archivo text-subtext tracking-[0.2em]">RECENT MATCHES</p>

            <div className="flex flex-col gap-5 mt-5">
                {
                    matches.slice(0, 5).map(match => (
                        <RecentMatchCard match={match}/>
                    ))
                }

            </div>


        </ForegroundCard>
    )
}