import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import QueueCard, { QueueIcon } from "../Components/Home/QueueCard";
import type { CanQueue, TableCounts, Tier, TierData, UserRating } from "../util/NetworkModels";
import { api, toFixedTruncated } from "../util/helpers";
import { useParams } from "react-router";
import type { TableInfo } from "../util/MiscInterfaces";
import { Button, Checkbox, Field, Input, Label, Radio, RadioGroup } from "@headlessui/react";
import ForegroundCard from "../Components/General/ForegroundCard";
import { LoaderCircle, Podium } from "lucide-react";
import { playtype as playtypeCorrect, games, ladder as ladderCorrect } from "../util/dictionaryCorrections";
import { useDebounce } from "../util/useDebounce";

export default function MatchPrep() {
    const { user, loading } = useAuth();
    const { game, playtype, ladder } = useParams();

    const [rating, setRating] = useState<UserRating>()
    const [canQueue, setCanQueue] = useState<CanQueue>({can_queue: false})
    const [error, setError] = useState<string>();

    const [selected, setSelected] = useState<string[]>([])
    const [matchType, setMatchType] = useState<"competitive" | "casual">("competitive")
    const [targetRating, setTargetRating] = useState<number>(0)
    
    const [tableCounts, setTableCounts] = useState<TableCounts>();
    const [casualCounts, setCasualCounts] = useState<TableCounts>();

    const debouncedRating = useDebounce(targetRating, 400);

    function toggle(icon: string, on: boolean) {
        setSelected(prev => on ? [...prev, icon] : prev.filter(i => i !== icon))
    }

    const TABLES: TableInfo[] = [
        { tableIcon: "☆", tableName: "Normal", category: "general" },
        { tableIcon: "★", tableName: "Insane", category: "general" },
        { tableIcon: "★★", tableName: "Overjoy", category: "general"},
        { tableIcon: "▽", tableName: "Normal2", category: "general" },
        { tableIcon: "▼", tableName: "Insane2", category: "general" },
        { tableIcon: "ξ", tableName: "Stardust", category: "general" },
        { tableIcon: "sr", tableName: "Starlight", category: "general" },
        { tableIcon: "sl", tableName: "Satellite", category: "general" },
        { tableIcon: "st", tableName: "Stella", category: "general" },
        { tableIcon: "Ude", tableName: "Arm Shougakkou", category: "skillset" },
        { tableIcon: "乱打", tableName: "Code Stream (sl)", category: "skillset" },
        { tableIcon: "重発狂", tableName: "Code Stream (st)", category: "skillset" },
        { tableIcon: "dl", tableName: "Delayjoy", category: "skillset" },
        { tableIcon: "fr", tableName: "Exoplanet", category: "skillset" },
        { tableIcon: "双", tableName: "Gachimijoy", category: "skillset" },
        { tableIcon: "◆", tableName: "LN", category: "skillset" },
        { tableIcon: "◆◆", tableName: "LN Overjoy", category: "skillset" },
        { tableIcon: "ln", tableName: "Luminous", category: "skillset" },
        { tableIcon: "SB", tableName: "Scramble", category: "skillset" },
        { tableIcon: "h◎", tableName: "Scratch 3rd", category: "skillset" },
        { tableIcon: "so", tableName: "Solar", category: "skillset" },
        { tableIcon: "sn", tableName: "Supernova", category: "skillset" }
    ]

    const generalTables = TABLES.filter(t => t.category === "general");
    const skillsetTables = TABLES.filter(t => t.category === "skillset");
    const generalSelected = generalTables.filter(t => selected.includes(t.tableIcon)).length;
    const skillsetSelected = skillsetTables.filter(t => selected.includes(t.tableIcon)).length;
    const allGeneral = generalSelected === generalTables.length;
    const allSkillset = skillsetSelected === skillsetTables.length;
    const selectedCharts = selected.reduce((sum, icon) => sum + (tableCounts?.[icon] ?? 0), 0);
    const MAX_ELO = 4300;
    const MIN_ELO = 100;

    useEffect(() => {
        if (!user) return;

        Promise.all([
            api<UserRating>(`/users/me/ratings/${game}/${playtype}/${ladder}`),
            api<CanQueue>("/users/me/can-queue"),
            api<TableCounts>(`/users/me/get_table_search_counts/${game}/${playtype}/${ladder}`)
        ])
        .then(([rating, canQueue, compCounts]) => {
            setRating(rating);
            setCanQueue(canQueue)
            setTargetRating(rating.display_rating)
            setTableCounts(compCounts)
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message)
        })
    }, [user])

    useEffect(() => {
        setTableCounts(undefined);

        if (matchType == "competitive") {
            api<TableCounts>(`/users/me/get_table_search_counts/${game}/${playtype}/${ladder}`)
            .then(tableCounts => {
                setTableCounts(tableCounts);
            })
        }
        else {
            api<TableCounts>(`/chart/get_table_search_counts/${game}/${playtype}/${ladder}/${toFixedTruncated(Math.min(Math.max(debouncedRating, 100), 4200), 0)}`)
            .then(tableCounts => {
                setTableCounts(tableCounts);
            })
        }

        if (Number.isNaN(debouncedRating)) return;
    }, [matchType, debouncedRating])

    useEffect(() => {
        if (rating == null)
            return

        setTargetRating(rating.display_rating)
    }, [matchType])
    
    if (loading || !rating || !playtype || !game || !ladder) {
        return <div className="flex-1 flex items-center justify-center text-muted">Loading…</div>
    }

    const selectAll = (tables: TableInfo[], on: boolean) => {
        const icons = tables.map(t => t.tableIcon);
        setSelected(prev => {
            const rest = prev.filter(i => !icons.includes(i));
            return on ? [...rest, ...icons] : rest;
        })
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col">
                <div>
                    <p className="font-archivo text-subtext uppercase tracking-[0.2em]">{games[game]} {playtypeCorrect[playtype]} &middot; {ladderCorrect[ladder]}</p>
                    <h1 className="font-extrabold text-4xl tracking-[0.2em] mt-3 mb-3">Choose Your Tables</h1>
                    <p className="font-sanchez text-subtext mb-5">Charts are only drawn from within the tables you pick</p>
                </div>
                <div className="flex w-full max-w-7xl items-start gap-8 mt-5">
                    <ForegroundCard className="w-72 shrink-0">
                        <QueueIcon
                        rating={rating.display_rating}
                        displayRating={true}
                        displayProgress={true}
                        />

                        <hr className="text-zinc-600/85 my-5" />

                        <p className="font-archivo tracking-widest text-subtext mb-5">Match Type</p>
                        <div>
                            <RadioGroup
                            value={matchType}
                            onChange={setMatchType}
                            aria-label="Match type"
                            className="grid grid-cols-2 gap-1 rounded-lg border border-zinc-700 bg-background p-1"
                            >
                                <Radio
                                value="competitive"
                                className="cursor-pointer select-none rounded-md py-2 text-center font-semibold text-subtext transition-colors data-checked:bg-highlight data-checked:text-white"
                                >
                                    Ranked
                                </Radio>

                                <Radio
                                value="casual"
                                className="cursor-pointer select-none rounded-md py-2 text-center font-semibold text-subtext transition-colors data-checked:bg-highlight data-checked:text-white"
                                >
                                    Casual
                                </Radio>
                            </RadioGroup>
                        </div>
                        <p className="font-archivo tracking-widest text-subtext mb-5 mt-5">Target Rating</p>
                        <Input
                        disabled={matchType == "competitive"} 
                        className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-background p-3 rounded-md hover:bg-zinc-800/80 duration-200 font-mono tracking-widest focus:outline-none font-bold"
                        max={MAX_ELO}
                        min={MIN_ELO} 
                        type={"number"} 
                        value={toFixedTruncated(targetRating, 0)}   
                        onChange={(e) => {
                        const v = parseInt(e.currentTarget.value);
                        setTargetRating(Number.isNaN(v) ? NaN : Math.min(v, MAX_ELO));
                        }} 
                        onBlur={() => {
                            setTargetRating(r => Number.isNaN(r) ? MIN_ELO : Math.max(r, MIN_ELO));
                        }}
                        
                        />
                    </ForegroundCard>
                    <div className="flex-1 min-w-0">
                        <div className="self-start">
                            <div className="justify-between flex flex-row">
                                <div>
                                <p className="font-archivo tracking-[0.2em] mb-5">General Tables <span className="text-subtext font-sanchez text-xs tracking-wide">{generalSelected} of {generalTables.length} selected</span></p>
                                </div>
                                <Button className="text-blue-300 hover:text-blue-200 cursor-pointer duration-200" onClick={() => selectAll(generalTables, !allGeneral)}>Select All</Button>
                            </div>

                            <hr className="text-zinc-600/85 mt-2 mb-5" />
                            <div className="grid grid-cols-3 gap-1">
                                {generalTables.map(t => (
                                    <Field className="w-full" key={t.tableIcon}>
                                        <Checkbox
                                        checked={selected.includes(t.tableIcon)}
                                        onChange={(on) => toggle(t.tableIcon, on)}
                                        className="select-none font-sanchez group flex gap-4 items-center justify-between rounded-xl border border-zinc-700 pr-3 pl-2 py-2 cursor-pointer
                                        data-checked:border-highlight data-checked:bg-highlight/10 mb-2 bg-background-dark hover:bg-background duration-150"
                                        >
                                            <span className="group-data-checked:bg-highlight/10 group-data-checked:border border border-transparent group-data-checked:border-highlight/50 w-16 shrink-0 rounded-md bg-zinc-800 py-2 text-center font-bold">{t.tableIcon}</span>
                                            <Label className="flex-1 min-w-0 truncate cursor-pointer">{t.tableName}</Label>
                                            {
                                                !tableCounts ?
                                                <span className="shrink-0 text-subtext"><LoaderCircle className=" m-auto size-4 animate-spin"/></span> :
                                                <span className="shrink-0 text-subtext">{tableCounts[t.tableIcon]}</span>
                                            }
                                            
                                        </Checkbox>
                                    </Field>
                                ))}
                            </div>
                            <div className="justify-between flex flex-row mt-5">
                                <div>
                                <p className="font-archivo tracking-[0.2em] mb-5">Skillset Tables <span className="text-subtext font-sanchez text-xs tracking-wide">{skillsetSelected} of {skillsetTables.length} selected</span></p>
                                </div>
                                <Button className="text-blue-300 hover:text-blue-200 cursor-pointer duration-a200" onClick={() => selectAll(skillsetTables, !allSkillset)}>Select All</Button>
                            </div>
                            <hr className="text-zinc-600/85 mt-2 mb-5" />
                            <div className="grid grid-cols-[repeat(3,minmax(17rem,1fr))] gap-1">
                                {skillsetTables.map(t => (
                                    <Field key={t.tableIcon}>
                                        <Checkbox
                                        checked={selected.includes(t.tableIcon)}
                                        onChange={(on) => toggle(t.tableIcon, on)}
                                        className="select-none font-sanchez group gap-4 flex items-center justify-between rounded-xl border border-zinc-700 pr-3 pl-2 py-2 cursor-pointer
                                        data-checked:border-highlight data-checked:bg-highlight/10 mb-2 bg-background-dark hover:bg-background duration-150"
                                        >
                                            <span className="group-data-checked:bg-highlight/10 group-data-checked:border border border-transparent group-data-checked:border-highlight/50 w-16 shrink-0 rounded-md bg-zinc-800 py-2 text-center font-bold">{t.tableIcon}</span>
                                            <Label className="flex-1 min-w-0 truncate cursor-pointer">{t.tableName}</Label>
                                            {
                                                !tableCounts ?
                                                <span className="shrink-0 text-subtext"><LoaderCircle className=" m-auto size-4 animate-spin"/></span> :
                                                <span className="shrink-0 text-subtext">{tableCounts[t.tableIcon]}</span>
                                            }
                                        </Checkbox>
                                    </Field>
                                ))}
                            </div>

                            <ForegroundCard className="mt-5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-sanchez">{selected.length} Tables &middot; up to {selectedCharts} Charts In Range</p>
                                    </div>
                                    <Button disabled={selectedCharts < 25} className="font-sanchez inline-flex items-center gap-2 bg-highlight brightness-80 hover:brightness-100 duration-200 cursor-pointer p-3 rounded-sm font-bold">Queue <Podium className="size-5 font-bold"/></Button>
                                </div>
                            </ForegroundCard>
                        </div>
                    </div>          
                </div>
            </div>




        </div>
    )
}