import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import type { UserRating } from "../../util/NetworkModels"
import { CornerDownRight } from "lucide-react"

interface ProfileGameTabsProps {
    ratings: UserRating[]
}

export default function ProfileGameTabs({ ratings } : ProfileGameTabsProps) {
    return (
        <TabGroup className="mt-2">
            <TabList>
                <Tab className="font-archivo uppercase p-5 bg-background-dark border border-zinc-500/30 rounded-t-2xl tracking-[0.2em] border-b-highlight border-b-2 focus:outline-none">BMS 7K</Tab>
            </TabList>

            <TabPanels>
                <TabPanel className="p-5 bg-background-dark border border-zinc-500/30 flex flex-row gap-4 items-center">
                    <CornerDownRight className="text-zinc-700"/>
                    <p className="font-archivo text-subtext tracking-[0.2em] text-sm">LADDER</p>
                    <div className="flex flex-row gap-2 bg-foreground p-2 rounded-md border-zinc-500/40 border">
                        <Button className="font-archivo tracking-wide bg-highlight p-3 rounded-md">EASY CLEAR</Button>
                        <Button className="font-archivo tracking-wide p-3 rounded-md hover:bg-zinc-500/50 cursor-pointer duration-150">HARD CLEAR</Button>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}