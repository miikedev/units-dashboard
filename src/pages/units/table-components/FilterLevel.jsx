import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { useAtom } from 'jotai'
import React from 'react'

import { districtAtom, levelDetailsAtom, selectedCreateDistrictKeyAtom, selectedCreatedTownshipKeyAtom, selectedCreateStateKeyAtom, stateAtom, townshipAtom } from '../atoms/filter'

const positions = [
    { key: "1", label: "Software Engineer" },
    { key: "2", label: "Product Manager" },
    { key: "3", label: "UI/UX Designer" },
    { key: "4", label: "Data Analyst" },
    { key: "5", label: "QA Engineer" },
]
const FilterLevel = () => {
    const [states,] = useAtom(stateAtom)
    const [disctricts,] = useAtom(districtAtom)
    const [townships,] = useAtom(townshipAtom)
    const [selectedStateKey, setSelectedStateKey] = useAtom(selectedCreateStateKeyAtom);
    const [selectedDistrictKey, setSelectedDistrictKey] = useAtom(selectedCreateDistrictKeyAtom);
    const [selectedTownshipKey, setSelectedTownshipKey] = useAtom(selectedCreatedTownshipKeyAtom);
    const [levelDetails, setLevelDetails] = useAtom(levelDetailsAtom)
    
    const onStateSelectionChange = (state) => {
        if (state === null) {
            setSelectedStateKey({ state: null, level: null });
            setSelectedDistrictKey({ district: null, level: null });
            setSelectedTownshipKey({ township: null, level: null });
        } else {
            setSelectedStateKey({ state, level: "state" });
            setLevelDetails({ state: state.name });
        }
    };

    const onDistrictSelectionChange = (district) => {
        setSelectedDistrictKey(district ? { district, level: "district" } : { district: null, level: null });
        setLevelDetails({ district: district.name });
    };

    const onTownshipSelectionChange = (township) => {
        setSelectedTownshipKey(township ? { township, level: "township" } : { township: null, level: null });
        setLevelDetails({ township: township.name });
    };
    console.log('districts', disctricts)
    console.log('townships', townships)
    return (
        <div className='flex items-center gap-3'>
            <Autocomplete
                className="max-w-xs rounded-none"
                defaultItems={states}
                onSelectionChange={onStateSelectionChange}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                
                placeholder="ပြည်နယ်ရွေးချယ်ပါ"
                radius='none'
            >
                {(state) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={state.key}>{state.label}</AutocompleteItem>}
            </Autocomplete>
            {(disctricts && selectedStateKey.state) && <Autocomplete
                onSelectionChange={onDistrictSelectionChange}
                className="max-w-xs rounded-none"
                defaultItems={disctricts}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                
                placeholder="ခရိုင်ရွေးချယ်ပါ"
                radius='none'
            >
                {(disctrict) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={disctrict.key}>{disctrict.label}</AutocompleteItem>}
            </Autocomplete>}
            {(townships && selectedDistrictKey.district) && <Autocomplete
                className="max-w-xs rounded-none"
                defaultItems={townships}
                onSelectionChange={onTownshipSelectionChange}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                
                placeholder="မြို့နယ်ရွေးချယ်ပါ"
                radius='none'
            >
                {(township) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={township.key}>{township.label}</AutocompleteItem>}
            </Autocomplete>}
        </div>
    )
}

export default FilterLevel