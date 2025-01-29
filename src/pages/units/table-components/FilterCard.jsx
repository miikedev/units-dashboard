import { Button, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@heroui/react';
import FilterStatus from './FilterStatus';
import SearchInput from './SearchInput';
import CreateModal from './CreateModal';
const FilterCard = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Card radius='none'>
            <CardBody>
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