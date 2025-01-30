import { Autocomplete, AutocompleteItem, Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useAtom } from 'jotai';
import { useState } from 'react'

import { districtAtom, fetchedPositionsAtom, levelDetailsAtom, selectedCreateDistrictKeyAtom, selectedCreatedTownshipKeyAtom, selectedCreateStateKeyAtom, stateAtom, townshipAtom } from '../atoms';
import { useUnitCreateMutation, useUnitFetchByIdQuery } from "@/apis/unitsQuery";

// const positions = [
//     { key: "1", label: "Software Engineer" },
//     { key: "2", label: "Product Manager" },
//     { key: "3", label: "UI/UX Designer" },
//     { key: "4", label: "Data Analyst" },
//     { key: "5", label: "QA Engineer" },
// ]
const status = [
    { key: "1", label: "ခန့်အပ်ပြီး" },
    { key: "2", label: "မခန့်အပ်သေး" }
]
const EditModal = ({ isOpen, onClose, id }) => {
    const [fetchedPositions,] = useAtom(fetchedPositionsAtom)
    const { mutate, isSuccess: isMutateSuccess, isPending: isMutatePending } = useUnitCreateMutation();
    const { data: editedData, isSuccess: editedDataSuccess } = useUnitFetchByIdQuery(id)
    const { positions } = fetchedPositions;
    const [states,] = useAtom(stateAtom)
    const [disctricts,] = useAtom(districtAtom)
    const [townships,] = useAtom(townshipAtom)
    const [selectedStateKey, setSelectedStateKey] = useAtom(selectedCreateStateKeyAtom);
    const [selectedDistrictKey, setSelectedDistrictKey] = useAtom(selectedCreateDistrictKeyAtom);
    const [selectedTownshipKey, setSelectedTownshipKey] = useAtom(selectedCreatedTownshipKeyAtom);
    const [levelDetails, setLevelDetails] = useAtom(levelDetailsAtom)
    const [validation, setValidation] = useState({});
    const [stateKey, setStateValue] = useState("")
    const [touchState, setTouchState] = useState(false)
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
    console.log('selected state key', selectedStateKey)
    console.log('validation', validation.type)
    const isValid = selectedStateKey.level === 'state';
    console.log(isValid)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));

        // Find selected geographical items
        const selectedState = states?.find(s => s.key === formData.state);
        const selectedDistrict = disctricts?.find(d => d.key === formData?.district);
        const selectedTownship = townships?.find(t => t.key === formData?.township);
        const { _id: selectedPositionId } = positions?.find(p => p?.name === formData?.position_id);
        console.log('selectedPosition id', selectedPositionId);
        // Validate selections
        console.log('validation message', validation)
        if (!selectedState && !selectedDistrict && !selectedTownship) {
            setValidation({ type: 'location', msg: 'please select at a location' });
        }
        // Transform data to match schema
        const transformedData = {
            name: formData.name,
            contact: formData.contact,
            level: "township",
            level_details: {
                state: { name: selectedState?.label },
                district: { name: selectedDistrict?.label },
                township: { name: selectedTownship?.label }
            },
            status: formData.status === "ခန့်အပ်ပြီး", // Convert to boolean
            position_id: selectedPositionId,
            // code will be generated server-side
        };

        console.log('Transformed Data:', transformedData);
        mutate({ payload: transformedData, token: localStorage.getItem('token') })
        if (isMutateSuccess) {
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    };
    return (
        <div>
            <Modal motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                },
            }} radius='none' backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                {editedDataSuccess &&<ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ခန့်အပ်ရန်</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={handleSubmit}>
                                    <Input defaultValue={editedData?.name} name="name" type="text" placeholder="နာမည်ရိုက်ပါ" radius='none' />
                                    <Input defaultValue={editedData?.contact} name="contact" type="text" placeholder="လိပ်စာရိုက်ပါ" radius='none' />
                                    <Autocomplete
                                        validationBehavior="native"
                                        // errorMessage={validation.type == undefined ? "" : "You must select a location"}
                                        // isInvalid={validation.type == undefined ? false : true}
                                        selectedKey={selectedStateKey.label}
                                        // onClose={() => setTouchState(true)}
                                        defaultSelectedKey={editedData?.level_details?.state?.name}
                                        name="state"
                                        className="max-w-xs rounded-none"
                                        defaultItems={states}
                                        onSelectionChange={onStateSelectionChange}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="ပြည်နယ်"
                                        placeholder="ပြည်နယ်ရွေးချယ်ပါ"
                                        radius='none'
                                        required
                                    >
                                        {(state) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={state.key}>{state.label}</AutocompleteItem>}
                                    </Autocomplete>
                                    {(selectedStateKey.state) && <Autocomplete
                                        onSelectionChange={onDistrictSelectionChange}
                                        defaultSelectedKey={editedData?.level_details?.district?.name}
                                        name="district"
                                        className="max-w-xs rounded-none"
                                        defaultItems={disctricts}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="ခရိုင်"
                                        placeholder="ခရိုင်ရွေးချယ်ပါ"
                                        radius='none'
                                    >
                                        {(disctrict) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={disctrict.key}>{disctrict.label}</AutocompleteItem>}
                                    </Autocomplete>}
                                    {(selectedDistrictKey.district) && <Autocomplete
                                        className="max-w-xs rounded-none"
                                        name="township"
                                        defaultSelectedKey={editedData?.level_details?.township?.name}
                                        defaultItems={townships}
                                        onSelectionChange={onTownshipSelectionChange}
                                        classNames={{
                                            listboxWrapper: "rounded-none",
                                            listbox: "rounded-none",
                                            base: "rounded-none",
                                            popoverContent: "rounded-none",
                                        }}
                                        label="မြို့နယ်"
                                        placeholder="မြို့နယ်ရွေးချယ်ပါ"
                                        radius='none'
                                    >
                                        {(township) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={township.key}>{township.label}</AutocompleteItem>}
                                    </Autocomplete>}
                                    {validation.type === 'location' && <p className="text-red-500 text-sm ml-1">{validation.msg}</p>}
                                    <Autocomplete
                                        // errorMessage={isValid || !touch ? "" : "You must select a location"}
                                        // isInvalid={isValid || !touch ? false : true}
                                        defaultSelectedKey={editedData?.position_id?._id}
                                        name="position_id"
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
                                    // onSelectionChange={setValue}
                                    >
                                        {(position) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={position._id}>{position.name}</AutocompleteItem>}
                                    </Autocomplete>
                                    <Autocomplete
                                        name="status"
                                        className="max-w-xs rounded-none"
                                        defaultSelectedKey={editedData?.status ? "1" : "2"}
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
                                        {(status) => <AutocompleteItem classNames={{
                                            base: 'rounded-none',
                                            selected: 'bg-blue-500',
                                            list: "rounded-none"
                                        }} key={status.key}>{status.label}</AutocompleteItem>}
                                    </Autocomplete>
                                    <ModalFooter>
                                        <Button
                                            type="submit"
                                            size="md"
                                            color="default"
                                            disabled={isMutatePending}
                                            radius="none"
                                        >
                                            {isMutatePending ? "Submitting..." : isMutateSuccess ? "Success!" : "Submit"}
                                        </Button>
                                        {/* {isMutateSuccess && <span className="text-green-600">ခန့်အပ်ခြင်းအောင်မြင်ပါသည်။</span>} */}
                                    </ModalFooter>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>}
            </Modal>
        </div>
    )
}

export default EditModal