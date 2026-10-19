import { ActivityCalendar } from "react-activity-calendar";
import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";

interface ProfileActivityCalendarProps {
    className?: string;
}

export default function ProfileActivityCalendar({ className }: ProfileActivityCalendarProps) {
    return (
        <ForegroundCard className={cn("flex flex-col", className)}>
            <p className="font-archivo text-subtext tracking-[0.2em]" >MATCH ACTIVITY</p>

            <div className="flex flex-1 items-center justify-center">
                <ActivityCalendar
                data={[]}
                loading
                colorScheme="dark"
                theme={{ dark: ["#27272A", "#A855F7"] }}
                labels={{ totalCount: "{{count}} matches in the last year" }}/>
            </div>

        </ForegroundCard>
    )
}