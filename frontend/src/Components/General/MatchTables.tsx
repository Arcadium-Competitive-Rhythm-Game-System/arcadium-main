import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import ForegroundCard from "./ForegroundCard";
import { ChevronDown } from "lucide-react";
import type { User } from "../../util/NetworkModels";

interface MatchTablesProps {
    user: User | null;
}

export default function MatchTables({ user }: MatchTablesProps) {
    return (
        <div>
            <p>Arcadium offers match tables that you can apply to your client. This way, chosen charts come up immediately to your game upon refreshing.</p>
            <ForegroundCard>
                <p className="font-archivo text-subtext tracking-[0.2em] mb-3">Match Table</p>
                <p className="font-mono bg-zinc-900 p-3 rounded-md">https://arcadium.com/api/match/{user?.id ?? "NA"}/table</p>
                <p className="mt-5 text-sm text-subtext">How this works: This is a dynamic song table, which retrieves your current match song whenever it is refreshed.</p>
            </ForegroundCard>
            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer">
                            <p className="font-archivo text-xl tracking-widest font-extralight mt-3 mb-3">How to add this to your game</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ForegroundCard>
                                <p className="font-sanchez ">Beatoraja Forks (LR2oraja, Endless Dream)</p>
                                <p className="text-subtext">Head to Resources. At the bottom, enter your match link and click the + icon. Select the entry from the list and click <span className="text-white">Load Selected Tables</span>. You should see <span className="text-white whitespace-nowrap">Arcadium Ladder: {user?.username}</span></p>
                            </ForegroundCard>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <p className="mt-3">Upon entering the game and selecting your table you should see "User has no active match". Once you start a match, ensure you're over the parent "table" folder, and press your table refresh button.</p>
            <ul>
                <li className="font-mono">- F8 on LR2 / openLR2</li>
                <li className="font-mono">- F2 on beatoraja / LR2oraja</li>
            </ul>
            
            <p className="mt-3">Then enter the table and you should see the new song.</p>
            <p className="text-subtext mt-3 text-sm">Please try this out on Casual first, to ensure everything is working.</p>
        </div>
    )
}