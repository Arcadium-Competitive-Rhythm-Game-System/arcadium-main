import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";
import RecentMatchCard from "./RecentMatchCard";

interface ProfileRecentMatches {
    className?: string;
}

export default function ProfileRecentMatches({ className }: ProfileRecentMatches) {
    return (
        <ForegroundCard className={cn("", className)}>
            <p className="font-archivo text-subtext tracking-[0.2em]">RECENT MATCHES</p>

            <div className="flex flex-col gap-5 mt-5">
                <RecentMatchCard/>
                <RecentMatchCard/>
                <RecentMatchCard/>
                <RecentMatchCard/>
                <RecentMatchCard/>
            </div>


        </ForegroundCard>
    )
}