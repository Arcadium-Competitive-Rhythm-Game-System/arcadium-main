import { ActivityCalendar } from "react-activity-calendar";
import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";
import type { ActivityData } from "../../util/MiscInterfaces";
import { useEffect, useMemo, useRef } from "react";

interface ProfileActivityCalendarProps {
    className?: string;
    data: Record<string, number>;
}

export default function ProfileActivityCalendar({ className, data }: ProfileActivityCalendarProps) {

    const wrapperRef = useRef<HTMLDivElement>(null);


    const toActivity = (counts: Record<string, number>, days = 365): ActivityData[] => {
        const out: ActivityData[] = [];
        const d = new Date();
        d.setDate(d.getDate() - (days - 1));

        for (let i = 0; i < days; i++, d.setDate(d.getDate() + 1)) {
            const date = d.toISOString().slice(0, 10)
            const count = counts[date] ?? 0
            out.push({ date, count, level: toLevel(count) })
        }

        return out
    }

    const toLevel = (n: number) => {
        if (n === 0) return 0;
        if (n <= 2) return 1;
        if (n <= 5) return 2;
        if (n <= 9) return 3;
        return 4;
    }

    const activity = useMemo(() => toActivity(data), [data])

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const scroller = Array.from(wrapper.querySelectorAll<HTMLDivElement>("*"))
        .find(el => el.scrollWidth > el.clientWidth) ?? wrapper;
        scroller.scrollLeft = scroller.scrollWidth;
    }, [activity])

    return (
        <ForegroundCard className={cn("flex flex-col", className)}>
            <p className="font-archivo text-subtext tracking-[0.2em]" >MATCH ACTIVITY</p>

            <div className="flex flex-1 items-center justify-center" ref={wrapperRef}>
                <ActivityCalendar
                data={activity}
                colorScheme="dark"
                theme={{ dark: ["#27272A", "#A855F7"] }}
                labels={{ totalCount: "{{count}} matches in the last year" }}/>
            </div>

        </ForegroundCard>
    )
}