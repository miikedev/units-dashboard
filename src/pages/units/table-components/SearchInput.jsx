import { Input } from '@heroui/react'
import { SearchIcon } from '../icons/SearchIcon'
const SearchInput = ({filterValue, onClear, onSearchChange}) => {
  return (
    <Input
        radius='none'
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search by name..."
        startContent={<SearchIcon />}
        // value={filterValue}
        // onClear={() => onClear()}
        // onValueChange={onSearchChange}
    />
  )
}

export default SearchInput