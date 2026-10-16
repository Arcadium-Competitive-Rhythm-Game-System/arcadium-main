import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";

interface ProfileStatRowProps {
    className?: string;
}

export default function ProfileStatRow({ className }: ProfileStatRowProps) {

    return (
        <div className={cn("flex flex-row gap-5", className)}>
            <ForegroundCard className="flex-1 flex flex-col gap-3">
                <p className="font-archivo tracking-[0.2em] text-subtext">MATCHES</p>
                <p className="font-mono text-xl font-extrabold tracking-widest">137</p>
                <p className="font-sanchez text-sm text-subtext">Ranked only</p>
            </ForegroundCard>
            <ForegroundCard className="flex-1 flex flex-col gap-3">
                <p className="font-archivo tracking-[0.2em] text-subtext">WIN RATE</p>
                <p className="font-mono text-xl font-extrabold tracking-widest">55%</p>
                <p className="font-sanchez text-sm text-subtext">W 75 &middot; L 72</p>
            </ForegroundCard>
        </div>
    )
}