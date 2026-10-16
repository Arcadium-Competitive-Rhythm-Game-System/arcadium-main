import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";
import type { RatingPoint } from "../../Pages/ProfilePage";

interface ProfileRatingOverTimeProps {
    className?: string;
    series: RatingPoint[]
}

export default function ProfileRatingOverTime({ className, series }: ProfileRatingOverTimeProps) {
    return (
        <ForegroundCard className={cn("flex flex-col gap-5", className)}>
            <p className="font-archivo text-subtext tracking-widest">RATING OVER TIME</p>
            <div className="flex-1 min-h-45">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series}>
                        <defs>
                            <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#A855F7" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="match_id" hide />
                        <YAxis domain={["dataMin - 50", "dataMax + 50"]} width={40} tick={{ fill: "#71717A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#121215", border: "1px solid #2A2A31" }} />
                        <Area type="monotone" dataKey="rating" stroke="#A855F7" strokeWidth={2.5} fill="url(#ratingFill)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </ForegroundCard>
    )
}