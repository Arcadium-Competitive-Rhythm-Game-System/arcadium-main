import { Button, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ForegroundCard from "../Components/General/ForegroundCard";

import { useNavigate } from "react-router";
import CreateNewAPIKey from "../assets/onboarding_assets/tachi_create_key.png";
import CreateAPIKey from "../assets/onboarding_assets/tachi_create_key_2.png";
import MyIntegrations from "../assets/onboarding_assets/tachi_my_integrations.png";
import BokutachiKey from "../Components/General/BokutachiKey";
import GettingSongs from "../Components/General/GettingSongs";
import MatchTables from "../Components/General/MatchTables";
import { useAuth } from "../hooks/useAuth";
import { api } from "../util/helpers";
import type { User } from "../util/NetworkModels";

export default function OnboardingPage() {

    const PHASES = [
        "Setting up your Bokutachi API key",
        "Getting songs",
        "Setting up your match tables"
    ]

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [phase, setPhase] = useState<number>(0);

    useEffect(() => {
        if (!user)
            return;

        if (user.has_tachi_key)
            setPhase(1);
    }, [])

    const finishOnboarding = async () => {
        try {
            let updatedUser = await api<User>(`/auth/me/finish_onboarding`, { method: "PUT" })
            
            setUser(updatedUser)

            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const displayPhases = () => {
        if (phase === 0) {
            return (
                <div>

                    <BokutachiKey onConfirmed={() => setPhase(phase+1)} className="lg:w-1/2 mx-auto" />
                    
                    <div className="mt-5 lg:w-1/2 mx-auto">

                    <Disclosure>
                    {({ open }) => (
                        <>
                        <DisclosureButton className="flex w-full items-center justify-between py-2 cursor-pointer">
                        <p className="font-archivo text-xl tracking-widest font-extralight">How to create a Bokutachi API Key</p>
                            <ChevronDown className={`size-4 duration-200 ${open ? "rotate-180" : ""}`} />
                        </DisclosureButton>
                        
                        <DisclosurePanel>
                            <p className="font-sanchez mt-5 text-lg">- Head over to <a className="text-highlight" target="_blank" href="https://boku.tachi.ac/">Bokutachi</a> and log in or make an account.</p>

                            <ForegroundCard className="mt-3">
                                <p className="font-sanchez text-subtext">- If this is your first time using Bokutachi, you need to set up your BMS client with IR integration.</p>
                            </ForegroundCard>

                            <hr className="mt-5 text-zinc-400/50" />
                            
                            <p className="font-sanchez mt-5 text-lg">- Click on your profile name on the top right and click <span className="font-bold">My Integrations</span></p>

                            <img className="mt-5 rounded-xl mx-auto border border-zinc-500/40" src={MyIntegrations} alt="My Integrations in Tachi"/>

                            <hr className="mt-5 text-zinc-400/50" />

                            <p className="font-sanchez mt-5 text-lg">- Click on <span className="font-bold">Create new API key</span>, give it any name, and click <span className="font-bold">Create Key</span>. Leave every box unchecked.</p>

                            <img className="mt-5 rounded-xl mx-auto border border-zinc-500/40" src={CreateNewAPIKey} alt="My Integrations in Tachi"/>
                            <img className="mt-5 rounded-xl mx-auto border border-zinc-500/40" src={CreateAPIKey} alt="My Integrations in Tachi"/>

                            <hr className="mt-5 text-zinc-400/50" />

                            <p className="font-sanchez mt-5 text-lg mb-25">- Click once to reveal the key, and then copy it to the input above.</p>
                        </DisclosurePanel>
                        </>
                    )}
                    </Disclosure>
                    </div>

                </div>
            )
        }
        else if (phase === 1) {
            return (
                <div className="lg:w-3/4 mx-auto mt-10 flex flex-col">
                    <GettingSongs />

                    <Button
                    onClick={() => setPhase(phase+1)}
                    className="self-end relative font-sanchez flex items-center gap-2 bg-highlight brightness-80 enabled:hover:brightness-100 duration-200 cursor-pointer p-3 rounded-sm font-bold mt-5
                                "
                    >
                    Next
                    </Button>             
                </div>


            )
        } else if (phase === 2) {
            return (
                <div className="font-sanchez lg:w-3/4 mx-auto mt-10 flex flex-col">
                    <MatchTables 
                    user={user}
                    />
                    <Button
                    onClick={finishOnboarding}
                    className="self-end relative font-sanchez flex items-center gap-2 bg-highlight brightness-80 enabled:hover:brightness-100 duration-200 cursor-pointer p-3 rounded-sm font-bold mt-3
                                "
                    >
                    Finish Onboarding
                    </Button>
                </div>
            )
        }
    }

    return (
        <div className="w-7/8 lg:w-3/4 mx-auto mt-20">
            <p className="font-archivo text-4xl text-subtext tracking-[0.2em] uppercase">Onboarding</p>

            <p className="mt-5 font-sanchez text-2xl tracking-widest font-bold">{PHASES[phase]}</p>

            {displayPhases()}
        </div>
    )
}