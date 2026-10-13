import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import QueueCard, { QueueIcon } from "../Components/Home/QueueCard";
import type { CanQueue, Tier, TierData, UserRating } from "../util/NetworkModels";
import { api } from "../util/helpers";
import { useParams } from "react-router";

export default function MatchPrep() {
    const { user, loading } = useAuth();
    const { game, playtype, ladder } = useParams();

    const [rating, setRating] = useState<UserRating>()
    const [canQueue, setCanQueue] = useState<CanQueue>({can_queue: false})
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!user) return;

        Promise.all([
            api<UserRating>(`/users/me/ratings/${game}/${playtype}/${ladder}`),
            api<CanQueue>("/users/me/can-queue")
        ])
        .then(([rating, canQueue]) => {
            setRating(rating);
            setCanQueue(canQueue)
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message)
        })
    }, [user])
    
    if (loading || !rating) {
        return <div className="flex-1 flex items-center justify-center text-muted">Loading…</div>
    }

    return (
        <div className="flex-1 flex-row flex items-center justify-center w-5/6 mx-auto lg:w-5/6">
            <div className="w-[15%]">
                <QueueIcon
                rating={rating.display_rating}
                displayRating={true}
                displayProgress={true}
                />
            </div>
            <div>
                <p className="font-archivo tracking-[0.2em]">General Tables</p>
                <hr className="text-zinc-600/85 mt-2" />


            </div>

        </div>
    )
}