import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";
import { QueueIcon } from "../Home/QueueCard";

interface ProfileTierCardProps {
    className?: string;
}

export default function ProfileTierCard({ className }: ProfileTierCardProps) {
    return (
        <div className={cn("w-full", className)}>
            <ForegroundCard>
                <QueueIcon 
                rating={2930}
                displayProgress={true}
                displayRating={true}
                />

                <hr className="my-4 text-zinc-500/50" />

                <div className="flex flex-col gap-3 font-sanchez">
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Peak</p>
                        <p className="font-mono">Gold II &middot; 1670</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Rank</p>
                        <p className="font-mono">#200 of 3400</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-subtext">Last Played</p>
                        <p>2 hours ago</p>
                    </div>

                </div>
            </ForegroundCard>
        </div>
    )
}