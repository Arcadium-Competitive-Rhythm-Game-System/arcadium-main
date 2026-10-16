import ForegroundCard from "../Components/General/ForegroundCard";
import { QueueIcon } from "../Components/Home/QueueCard";
import ProfileGameTabs from "../Components/Profile/ProfileGameTabs";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileMilestoneCard from "../Components/Profile/ProfileMilestoneCard";
import ProfileRatingOverTime from "../Components/Profile/ProfileRatingOverTime";
import ProfileStatRow from "../Components/Profile/ProfileStatRow";
import ProfileTierCard from "../Components/Profile/ProfileTierCard";
import { useAuth } from "../hooks/useAuth";
import { bmsAACollector, bmsVeteran } from "../util/milestoneDictionaries";

export interface RatingPoint {
  match_id: number;
  played_at: string;   // ISO 8601
  rating: number;      // display rating after the match
  delta: number;
  result: "win" | "lose";
}

const MOCK_RATING_SERIES: RatingPoint[] = [
    { match_id: 101, played_at: "2026-09-15T22:14:00Z", rating: 1218, delta: 18,  result: "win" },
    { match_id: 102, played_at: "2026-09-16T23:02:00Z", rating: 1239, delta: 21,  result: "win" },
    { match_id: 103, played_at: "2026-09-17T21:40:00Z", rating: 1224, delta: -15, result: "lose" },
    { match_id: 104, played_at: "2026-09-18T22:55:00Z", rating: 1243, delta: 19,  result: "win" },
    { match_id: 105, played_at: "2026-09-19T20:31:00Z", rating: 1265, delta: 22,  result: "win" },
    { match_id: 106, played_at: "2026-09-20T23:47:00Z", rating: 1248, delta: -17, result: "lose" },
    { match_id: 107, played_at: "2026-09-21T21:12:00Z", rating: 1264, delta: 16,  result: "win" },
    { match_id: 108, played_at: "2026-09-22T22:08:00Z", rating: 1284, delta: 20,  result: "win" },
    { match_id: 109, played_at: "2026-09-23T23:30:00Z", rating: 1308, delta: 24,  result: "win" },
    { match_id: 110, played_at: "2026-09-24T21:59:00Z", rating: 1289, delta: -19, result: "lose" },
    { match_id: 111, played_at: "2026-09-25T22:41:00Z", rating: 1306, delta: 17,  result: "win" },
    { match_id: 112, played_at: "2026-09-26T20:17:00Z", rating: 1285, delta: -21, result: "lose" },
    { match_id: 113, played_at: "2026-09-27T23:05:00Z", rating: 1308, delta: 23,  result: "win" },
    { match_id: 114, played_at: "2026-09-28T22:26:00Z", rating: 1326, delta: 18,  result: "win" },
    { match_id: 115, played_at: "2026-09-29T21:48:00Z", rating: 1346, delta: 20,  result: "win" },
    { match_id: 116, played_at: "2026-09-30T23:19:00Z", rating: 1330, delta: -16, result: "lose" },
    { match_id: 117, played_at: "2026-10-01T22:37:00Z", rating: 1352, delta: 22,  result: "win" },
    { match_id: 118, played_at: "2026-10-02T21:03:00Z", rating: 1371, delta: 19,  result: "win" },
    { match_id: 119, played_at: "2026-10-03T23:51:00Z", rating: 1347, delta: -24, result: "lose" },
    { match_id: 120, played_at: "2026-10-04T22:10:00Z", rating: 1329, delta: -18, result: "lose" },
    { match_id: 121, played_at: "2026-10-05T20:44:00Z", rating: 1350, delta: 21,  result: "win" },
    { match_id: 122, played_at: "2026-10-06T23:28:00Z", rating: 1330, delta: -20, result: "lose" },
    { match_id: 123, played_at: "2026-10-07T22:52:00Z", rating: 1308, delta: -22, result: "lose" },
    { match_id: 124, played_at: "2026-10-08T21:35:00Z", rating: 1325, delta: 17,  result: "win" },
    { match_id: 125, played_at: "2026-10-09T23:14:00Z", rating: 1306, delta: -19, result: "lose" },
    { match_id: 126, played_at: "2026-10-10T22:01:00Z", rating: 1283, delta: -23, result: "lose" },
    { match_id: 127, played_at: "2026-10-11T20:58:00Z", rating: 1262, delta: -21, result: "lose" },
    { match_id: 128, played_at: "2026-10-12T23:40:00Z", rating: 1280, delta: 18,  result: "win" },
    { match_id: 129, played_at: "2026-10-13T22:22:00Z", rating: 1256, delta: -24, result: "lose" },
    { match_id: 130, played_at: "2026-10-14T21:47:00Z", rating: 1234, delta: -22, result: "lose" },
    ];

export default function ProfilePage() {
    const { user, loading } = useAuth();

    if (loading || !user)
        return (
            <div>Loading...</div>
        )

    return (
        <div className="flex flex-col gap-5 mx-auto w-1/2 mt-10">
            <ProfileHeader
            displayName={user?.display_name}
            />
            <ProfileGameTabs
            ratings={[]}
            />

            <div className="flex flex-row gap-5">
                <ProfileTierCard 
                className="w-1/4"
                />

                <div className="w-3/4 flex flex-col gap-5">
                    <ProfileStatRow className="flex-1"/>

                    <ProfileRatingOverTime
                    className="flex-3"
                    series={MOCK_RATING_SERIES}/>
                </div>
            </div>

            <p className="font-archivo p-2 tracking-[0.2em]">MILESTONES</p>
            <hr className="text-zinc-600"/>

            <div className="flex flex-row gap-10">
                <ProfileMilestoneCard
                className="flex-1"
                milestoneName="AA Collector"
                countTitle="AAs"
                descriptor="AA or better"
                milestoneLadder={bmsAACollector}
                value={2}
                />
                <ProfileMilestoneCard
                className="flex-1"
                milestoneName="Veteran"
                countTitle="matches"
                descriptor="Play a ranked match"
                milestoneLadder={bmsVeteran}
                value={577}
                />
            </div>

        </div>
    )
}