interface ProfileHeaderProps {
    displayName: string
}

export default function ProfileHeader({ displayName } : ProfileHeaderProps) {
    return (
        <div className="flex flex-row items-center gap-5 bg-zinc-800/20 p-2 border border-zinc-600/50">
            <div>
                <img
                src="https://placehold.co/600x400"
                alt="User's avatar"
                className="size-24 shrink-0 rounded-lg object-cover bg-surface border border-border"
                />
            </div>
            <div>
                <p className="font-archivo text-lg uppercase text-subtext tracking-[0.2em]">Player Profile</p>
                <p className="font-sanchez text-4xl mt-2 tracking-wide">{displayName}</p>
                <p className="font-sanchez text-sm mt-2 text-subtext">Joined Sep 2024 &middot; 2y</p>
            </div>

        </div>
    )
}