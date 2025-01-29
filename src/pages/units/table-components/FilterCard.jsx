import { Button, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@heroui/react';
import FilterStatus from './FilterStatus';
import SearchInput from './SearchInput';
import CreateModal from './CreateModal';
import FilterLevel from './FilterLevel';
// const positions = [
//     { key: "1", label: "Software Engineer" },
//     { key: "2", label: "Product Manager" },
//     { key: "3", label: "UI/UX Designer" },
//     { key: "4", label: "Data Analyst" },
//     { key: "5", label: "QA Engineer" },
// ]
const FilterCard = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Card radius='none'>
            <CardBody>
                <div className='flex gap-3 justify-between mb-2'>
                    <FilterLevel />
                    <Button className='w-[8rem]' radius='none'>Offer Letter</Button>
                </div>
                <div className='flex gap-3 justify-between'>
                <SearchInput />
                <div className='flex gap-3'>
                <FilterStatus />
                <Button onPress={() => onOpen()} className='w-[8rem]' radius='none'>ခန့်အပ်ရန်</Button>
                </div>
                </div>
                <CreateModal isOpen={isOpen} onClose={onClose} />
            </CardBody>
        </Card>
    )
}

export default FilterCard