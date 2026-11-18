import { Button, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import ForegroundCard from "./ForegroundCard";
import { ChevronDown } from "lucide-react";

export default function GettingSongs() {
    return (
        <div className="font-sanchez w-full">
            <ForegroundCard className="mb-3">
                <p className="font-sanchez">Arcadium uses the same difficulty tables that Bokutachi uses. For those who are not familiar with difficulty tables or obtaining a multitude of songs, please check out the guides below for your respective BMS client. Use the following methods to install the tables of your choice.</p>
                <p className="text-subtext mt-2">The games below are the clients we support. If you are not using any of these, we cannot guarantee a smooth experience.</p>
            </ForegroundCard>

            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer mb-3">
                            <p className="flex items-center gap-2 font-archivo text-xl tracking-widest font-extralight">
                                Endless Dream (Backbeat Support)
                                <span className="font-sanchez ml-2 bg-green-900/50 p-2 rounded-md border border-green-800 text-green-500 text-sm">
                                    Recommended
                                </span>
                            </p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>   
                        <DisclosurePanel>
                            <ForegroundCard>
                                <p>Backbeat is a method of obtaining all of the songs in a table with ease. You can learn more about it and grab it <a target="_blank" href="https://backbeat.ac/" className="text-highlight">here.</a></p>
                                <p>It requires a backbeat-supported client. Endless Dream's backbeat fork is <a href="https://github.com/zkldi/lr2oraja-endlessdream/releases/tag/bkb-beta" target="_blank" className="text-highlight">here.</a> </p> 
                                <p className="mt-5">Setting up a backbeat supported data server such as <a target="_blank" href="https://makiba.ac/" className="text-highlight">Makiba</a> and searching for tables there, allows backbeat to install all the songs to your game automatically.</p>
                                <p className="mt-5">You may also use the <span className="text-subtext"><i>Download with Backbeat</i></span> button on Arcadium to instantly install charts to your game.</p>
                                <p className="text-subtext text-sm mt-5">Please also prepare your Endless Dream for installing in-game through <a href="https://gingerrush.com/#/integrations" target="_blank" className="text-highlight">Gingerrush.</a></p>
                            </ForegroundCard>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer mb-3">
                            <p className="flex items-center gap-2 font-archivo text-xl tracking-widest font-extralight">
                                Endless Dream (Standard)
                                <span className="font-sanchez ml-2 bg-green-900/50 p-2 rounded-md border border-green-800 text-green-500 text-sm">
                                    Recommended
                                </span>
                            </p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>  
                        <DisclosurePanel>
                            <ForegroundCard>
                                <p>Endless Dream is a fork of LR2oraja, that adds many useful and convenient features. One of which being the ability to download songs directly from a data server in-game.</p>
                                <p className="mt-5">You can grab Endless Dream <a href="https://github.com/seraxis/lr2oraja-endlessdream/releases" target="_blank" className="text-highlight">here.</a></p>   
                                <p className="mt-5">Set up Endless Dream for use with <a href="https://gingerrush.com/#/integrations" target="_blank" className="text-highlight">Gingerrush</a></p>   
                                <p className="mt-5">To prepare a difficulty table inside Endless Dream. Head to the Resources tab. There should be a multitude of tables already available in the client. Select some, and press <span className="text-subtext">Load Selected Tables.</span></p>
                                <p className="mt-5">In-game, the table should appear. Hover over the table and press Button 5 (third white button). You should see <span className="text-subtext">Fill Missing Charts.</span> This should install all the charts in the table that exist on Gingerrush.</p>   
                                <p className="mt-5 text-subtext text-sm">If the above doesn't work, please follow the LR2oraja guide, which uses Be-Music Seeker.</p>
                            </ForegroundCard>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer mb-3">
                            <p className="font-archivo text-xl tracking-widest font-extralight">LR2oraja</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>   
                        <DisclosurePanel>
                            <ForegroundCard>
                                <p>LR2oraja is a fork of Beatoraja, with LR2 gauges and feel. You can grab it <a href="https://github.com/wcko87/lr2oraja/releases" target="_blank" className="text-highlight">here</a></p>   
                                <p className="mt-5">You will also need Be-Music Seeker, which you can grab <a href="https://github.com/Neeted/bemusicseeker-unofficial-fork/releases" target="_blank" className="text-highlight">here.</a> This keeps track of your libraries, and lets you download music quickly.</p>   
                                <p className="mt-5">Open LR2oraja and enter Resources. You should see a bunch of table links. Click the ones you want and select <span className="text-subtext">Load Selected Tables.</span> Enter the game, you should see the table there.</p> 
                                <p className="mt-5">Open Be-Music Seeker, select <span className="text-subtext">Standalone</span>, and choose a folder or parent folder where your current BMS charts live (or wish to live). Go down to Beatoraja path and choose the root folder of your LR2oraja setup. If this fails, retry 
                                a few times, or relaunch LR2oraja. If it still fails, double check your song database is updated correctly through LR2oraja.
                                </p>  
                                <p className="mt-5">Click <span className="text-subtext">Import Beatoraja Tables</span>. Once this is good, save and your Be-Music Seeker should index your current library. You should visibly see a lot of table names on the top left.</p>
                                <p className="mt-5">Select a table you'd like to get songs for. You should see a list of sub-folders, and one that says <span className="text-subtext">[NO SONG]</span>. Right clicking on a song and selecting <span className="text-subtext">Find By External API</span> will 
                                install the selected charts to the best of the program's ability. You can select multiple (even mass select) songs and download them all at once.
                                </p>
                                <p className="mt-5">Update the song database, to ensure the downloaded music enters LR2oraja's database. Also double check where the songs download to is specified in your LR2oraja BMS directory.</p>
                            </ForegroundCard>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer">
                            <p className="font-archivo text-xl tracking-widest font-extralight">openLR2</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ForegroundCard>
                                <p className="font-sanchez text-subtext">This section is a work-in-progress</p>
                            </ForegroundCard>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}