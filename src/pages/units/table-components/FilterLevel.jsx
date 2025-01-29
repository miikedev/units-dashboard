import React from 'react'
import { Autocomplete, AutocompleteItem } from '@heroui/react'
const positions = [
    { key: "1", label: "Software Engineer" },
    { key: "2", label: "Product Manager" },
    { key: "3", label: "UI/UX Designer" },
    { key: "4", label: "Data Analyst" },
    { key: "5", label: "QA Engineer" },
]
const FilterLevel = () => {
    return (
        <div className='flex items-center gap-3'>
            <Autocomplete
                className="max-w-[13rem] rounded-none"
                defaultItems={positions}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                placeholder="ပြည်နယ်ရွေးချယ်ပါ"
                radius='none'
            >
                {(animal) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={animal.key}>{animal.label}</AutocompleteItem>}
            </Autocomplete>
            <Autocomplete
                className="max-w-[13rem] rounded-none"
                defaultItems={positions}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                placeholder="ခရိုင်ရွေးချယ်ပါ"
                radius='none'
            >
                {(animal) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={animal.key}>{animal.label}</AutocompleteItem>}
            </Autocomplete>
            <Autocomplete
                className="max-w-[13rem] rounded-none"
                defaultItems={positions}
                classNames={{
                    listboxWrapper: "rounded-none",
                    listbox: "rounded-none",
                    base: "rounded-none",
                    popoverContent: "rounded-none",
                }}
                placeholder="မြို့နယ်ရွေးချယ်ပါ"
                radius='none'
            >
                {(animal) => <AutocompleteItem classNames={{
                    base: 'rounded-none',
                    selected: 'bg-blue-500',
                    list: "rounded-none"
                }} key={animal.key}>{animal.label}</AutocompleteItem>}
            </Autocomplete>
        </div>
    )
}

export default FilterLevel