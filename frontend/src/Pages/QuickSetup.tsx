import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { useAuth } from "../hooks/useAuth"
import { ChevronDown } from "lucide-react"
import GettingSongs from "../Components/General/GettingSongs"
import MatchTables from "../Components/General/MatchTables"

export default function QuickSetup() {
    const { user } = useAuth()

    return (
        <div className="w-7/8 lg:w-1/2 mx-auto">
            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer">
                            <p className="font-archivo text-xl tracking-widest font-extralight mt-3 mb-3">Getting Songs</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>

                        <DisclosurePanel>
                            <GettingSongs />
                        </DisclosurePanel>                   
                    </>

                )}
            </Disclosure>

            <Disclosure>
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer">
                            <p className="font-archivo text-xl tracking-widest font-extralight mt-3 mb-3">Setting up your match tables</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>

                        <DisclosurePanel>
                            <MatchTables user={user} />
                        </DisclosurePanel>                   
                    </>

                )}
            </Disclosure>
        </div>
    )
}