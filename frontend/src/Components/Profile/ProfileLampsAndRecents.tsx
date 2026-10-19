import { ClearType } from "../../util/enums";
import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";

interface ProfileLampsAndRecents {
    className?: string;
}

export const LAMP_COLORS: Record<ClearType, string> = {
  [ClearType.ASSIST_CLEAR]: "#8B5CF6",
  [ClearType.EASY_CLEAR]: "#4ADE80",
  [ClearType.CLEAR]: "#60A5FA",
  [ClearType.HARD_CLEAR]: "#F4F4F5",
  [ClearType.EX_HARD_CLEAR]: "#FACC15",
  [ClearType.FULL_COMBO]: "#22D3EE",
};

export const LAMP_LABELS: Record<ClearType, string> = {
  [ClearType.ASSIST_CLEAR]: "Assist",
  [ClearType.EASY_CLEAR]: "Easy",
  [ClearType.CLEAR]: "Clear",
  [ClearType.HARD_CLEAR]: "Hard",
  [ClearType.EX_HARD_CLEAR]: "EX Hard",
  [ClearType.FULL_COMBO]: "Full Combo",
};

export default function ProfileLampsAndRecents({ className }: ProfileLampsAndRecents) {
    return (
        <ForegroundCard className={cn("flex flex-col gap-7", className)} >
            <p className="font-archivo tracking-[0.2em] text-subtext">LAMPS</p>

            <div className="flex h-3.5 gap-0.5 overflow-hidden rounded-full bg-zinc-800">
                <div 
                style={{
                    width: "25%",
                    backgroundColor: LAMP_COLORS["EASY CLEAR"]
                }}
                />
                <div 
                style={{
                    width: "25%",
                    backgroundColor: LAMP_COLORS["HARD CLEAR"]
                }}
                />
                <div 
                style={{
                    width: "25%",
                    backgroundColor: LAMP_COLORS["EX HARD CLEAR"]
                }}
                />
                <div 
                style={{
                    width: "25%",
                    backgroundColor: LAMP_COLORS["FULL COMBO"]
                }}
                />
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-4 gap-y-5">
                {Object.values(ClearType).map(lamp => (
                    <div key={lamp} className="flex items-center gap-2 font-sanchez text-sm text-subtext">
                        <span className="size-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: LAMP_COLORS[lamp] }}/>
                        <span className="flex-1">{LAMP_LABELS[lamp]}</span>
                        <span className="font-mono">200</span>
                    </div>
                ))}
            </div>

            <hr className="text-zinc-500/50" />

            <div className="flex flex-col gap-5">
                <p className="text-subtext font-archivo tracking-[0.2em]">RECENT FORM</p>
                <div className="flex flex-wrap gap-3">
                    {
                        Array.from({ length: 20 }, (_, i) => (
                        <span
                        className={`size-8 flex items-center justify-center rounded-[5px] text-sm border font-mono font-bold ${"border-green-400 bg-green-400/15 text-green-400"
                        }`}
                        >
                        W
                        </span>    
                        ))
                    }
                </div>
            </div>

        </ForegroundCard>
    )
}