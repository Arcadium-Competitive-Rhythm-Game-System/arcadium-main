import { cn } from "../../util/helpers";
import ForegroundCard from "../General/ForegroundCard";
import ProgressBar from "../General/ProgressBar";
import ProfileIndividualTableProgress from "./ProfileIndividualTableProgress";

interface ProfileTableWinrateProps {
    className?: string;
}

export default function ProfileTableWinrate({ className }: ProfileTableWinrateProps) {
    return (
        <ForegroundCard className={cn("flex flex-col gap-4", className)}>
            <p className="font-archivo text-subtext tracking-[0.2em]">WIN RATE BY TABLE</p>
            
            <ProfileIndividualTableProgress 
            tableIcon="★"
            tableName="Insane"
            />
            <ProfileIndividualTableProgress 
            tableIcon="▼" 
            tableName="Insane2"
            />
            <ProfileIndividualTableProgress 
            tableIcon="★★"
            tableName="Overjoy"
            />
            <ProfileIndividualTableProgress 
            tableIcon="☆" 
            tableName="Normal"
            />
            <ProfileIndividualTableProgress 
            tableIcon="▽"
            tableName="Normal2"
            />
            
        </ForegroundCard>
    )
}