interface ProfileHeaderProps {
    displayName: string
}

export default function ProfileHeader({ displayName } : ProfileHeaderProps) {
    return (
        <div>
            <p className="font-archivo text-lg uppercase text-subtext tracking-[0.2em]">Player Profile</p>
            <p className="font-sanchez text-4xl mt-2 tracking-wide">{displayName}</p>
            <p className="font-sanchez text-sm mt-2 text-subtext">Joined Sep 2024 &middot; 2y</p>
        </div>
    )
}