import { Button, Checkbox, Disclosure, DisclosureButton, DisclosurePanel, Field, Label } from "@headlessui/react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import type { TableInfo } from "../../util/MiscInterfaces";
import type { TableCounts } from "../../util/NetworkModels";

interface TableSectionProps {
    label: string;
    tables: TableInfo[];
    selected: string[];
    tableCounts: TableCounts | undefined;
    selectAll: (tables: TableInfo[], general: boolean) => void;
    toggle: (icon: string, on: boolean) => void;
}

export default function TableSection({ tables, selected, selectAll, toggle, tableCounts, label } : TableSectionProps) {
    
    const tableLength = tables.filter(t => selected.includes(t.tableIcon)).length;
    const general = tableLength === tables.length;

    return (
    <Disclosure>
        {({ open }) => (
            <>
                <div className="justify-between flex flex-row">
                    <DisclosureButton className="lg:pointer-events-none flex items-center gap-2 ">
                        <p className="font-archivo tracking-[0.2em] mb-5">{label} <span className="text-subtext font-sanchez text-xs tracking-wide">{tableLength} of {tables.length} selected</span></p>
                        <ChevronDown className={`size-4 lg:hidden ${open ? "rotate-180" : ""}`} />
                    </DisclosureButton>
                    <Button className="text-blue-300 hover:text-blue-200 cursor-pointer duration-200" onClick={() => selectAll(tables, !general)}>Select All</Button>
                </div>
                <hr className="text-zinc-600/85 mt-2 mb-5" />
                    <DisclosurePanel static className={`${open ? "grid" : "hidden"} lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1`}>
                        {tables.map(t => (
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
                    </DisclosurePanel> 
           
            </>
        )}
    </Disclosure>
    )

}