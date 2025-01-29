import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'
import { ChevronDown as ChevronDownIcon } from 'lucide-react'
export const statusOptions = [
    { name: "ခန့်အပ်ပြီး", uid: true },
    { name: "လျာထားပြီး", uid: false },
];
const FilterStatus = (statusFilter, setStatusFilter) => {
  return (
    <div>
    <Dropdown classNames={{
        base: 'w-[8rem] p-0',
        content: 'p-0 w-[5rem]',
    }} radius='none'>
              <DropdownTrigger className="hidden sm:flex">
                <Button className='w-[8rem]' radius='none' endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                // itemClasses={{
                //     wrapper: 'w-[8rem]',
                //     base: 'w-[8rem]',
                // }}
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                radius="none"
                // selectedKeys={statusFilter}
                selectionMode="multiple"
                // onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize rounded-none">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
    </Dropdown>
    </div>
  )
}

export default FilterStatus