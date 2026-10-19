import { cn } from "../../util/helpers";
import ProgressBar from "../General/ProgressBar";

interface ProfileIndividualTableProgressProps {
    className?: string;
    tableIcon: string;
    tableName: string;
}

export default function ProfileIndividualTableProgress({ className, tableIcon, tableName }: ProfileIndividualTableProgressProps) {
    return (
        <div className={cn("w-full flex-1 grid grid-cols-[3.5rem_1fr_2rem] items-center gap-5", className)}>
            <p className="items-center bg-zinc-800 border border-zinc-600/50 px-3 py-1 rounded-md text-center justify-center">{tableIcon}</p>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p className="text-sm font-sanchez text-subtext">{tableName}</p>
                    <p className="text-sm font-sanchez text-subtext">38 played</p>
                </div>  
                <ProgressBar/>
            </div>
            <p className="font-mono self-stretch items-center rounded-md text-center">25%</p>
        </div>
    )
}