import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Input,
    Autocomplete,
    AutocompleteItem,
} from "@heroui/react";
import { useAtom } from 'jotai';
import { fetchedPositionsAtom } from '../atoms';
// const positions = [
//     { key: "1", label: "Software Engineer" },
//     { key: "2", label: "Product Manager" },
//     { key: "3", label: "UI/UX Designer" },
//     { key: "4", label: "Data Analyst" },
//     { key: "5", label: "QA Engineer" },
// ]
const status = [
    { key: "1", label: "Active" },
    { key: "2", label: "Inactive" }
]
const CreateModal = ({ isOpen, onClose }) => {
    const [fetchedPositions,] = useAtom(fetchedPositionsAtom)
    const {positions} = fetchedPositions;
    return (
        <div>
            <Modal radius='none' backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ခန့်အပ်ရန်</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Input type="text" placeholder="နာမည်ရိုက်ပါ" radius='none' />
                                    <Input type="text" placeholder="လိပ်စာရိုက်ပါ" radius='none' />
                                    <Autocomplete
                                        className="max-w-xs rounded-none"
                                        defaultItems={positions}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="ရာထူး"
                                        placeholder="ရာထူးရွေးချယ်ပါ"
                                        radius='none'
                                    >
                                        {(animal) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={animal._id}>{animal.name}</AutocompleteItem>}
                                    </Autocomplete>
                                    <Autocomplete
                                        className="max-w-xs rounded-none"
                                        defaultItems={status}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="status"
                                        placeholder="choose one status"
                                        radius='none'
                                    >
                                        {(animal) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={animal.key}>{animal.label}</AutocompleteItem>}
                                    </Autocomplete>
                                    <Autocomplete
                                        className="max-w-xs rounded-none"
                                        defaultItems={status}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="status"
                                        placeholder="choose one status"
                                        radius='none'
                                    >
                                        {(animal) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={animal.key}>{animal.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button radius="none" className="hover:bg-red-500 hover:text-white" color="blue" variant="light">
                                    အတည်ပြုပါ
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateModal