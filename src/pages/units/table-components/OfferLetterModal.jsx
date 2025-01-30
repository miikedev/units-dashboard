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
                                    <Popover className="z-10">
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
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