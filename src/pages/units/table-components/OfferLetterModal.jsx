"use client"
import React from 'react'
import { Autocomplete, AutocompleteItem, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useAtom } from 'jotai';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const OfferLetterModal = ({ isOpen, onClose }) => {
    const [date, setDate] = React.useState();
    return (
        <div>
            <Modal radius='none' backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ခန့်အပ်ရန်</ModalHeader>
                            <ModalBody>
                                <Form className='h-[300px]'>
                                    <Calendar showMonthAndYearPickers aria-label="Date (Show Month and Year Picker)" />;
                                    <Input type="file" radius='none' />
                                    <Button radius="none" className="hover:bg-red-500 hover:text-white" color="blue" variant="light">
                                        အတည်ပြုပါ
                                    </Button>
                                </Form>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default OfferLetterModal