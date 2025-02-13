import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Form,
} from "@heroui/react";
import { useLocationsQuery } from "@/apis/locationsQuery";
import { useUnitCreateMutation } from "@/apis/unitsQuery";
import { usePositionQuery } from "@/apis/positionsQuery";

import { useAtom } from "jotai";
import {
  stateIdAtom,
  districtIdAtom,
  townshipIdAtom,
  statusAtom,
  positionIdAtom,
} from "../atoms/createUnitAtom";

const statuses = [
  { key: "A", label: "ခန့်အပ်ပြီး" },
  { key: "C", label: "မခန့်အပ်သေး" },
];

const CreateModalAlpha = ({ isOpen, onClose }) => {
  const {
    mutate,
    isSuccess: createUnitSuccess,
    isPending: createUnitPending,
  } = useUnitCreateMutation();

  const {
    data: locationData,
    isLoading: locationLoading,
    isSuccess: locationSuccess,
  } = useLocationsQuery();

  const {
    data: positionData,
    isSuccess: positionSuccess,
    isLoading: positionLoading,
  } = usePositionQuery();

  console.log("position data", positionData);

  const [states, setStates] = useState([]);

  // isSucess set state data
  useEffect(() => {
    if (locationSuccess) {
      setStates(locationData.data);
    }
  }, [locationSuccess]);

  const [districts, setDistricts] = useState([]);
  const [townships, setTownships] = useState([]);

  const [positions, setPositions] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState(null);

  const [stateId, setStateId] = useAtom(stateIdAtom);
  const [districtId, setDistrictId] = useAtom(districtIdAtom);
  const [townshipId, setTownshipId] = useAtom(townshipIdAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [positionId, setPositionId] = useAtom(positionIdAtom);

  console.log("stateId", stateId);
  console.log("districtId", districtId);
  console.log("townshipId", townshipId);
  console.log("status", status);
  console.log("mutate success", createUnitSuccess);

  //if selected level has changed, set it's respective positions
  useEffect(() => {
    setPositions(
      positionData?.data.filter((position) => position.level === selectedLevel),
    );
  }, [selectedLevel]);

  const handleStateSelectionChange = (stateId) => {
    // set selected level as state
    setSelectedLevel("state");
    // filter districts relate to selected state
    const filteredDistricts = states?.filter((s) => s._id == stateId);
    console.log("filtered districts", filteredDistricts);
    setDistricts(filteredDistricts[0]?.districts);
    setStateId(stateId);
    //set state positions
    // setPositions(positionData.data.filter((p) => p.level == "state"));
  };

  const handleDistrictSelectionChange = (districtId) => {
    // set selected level as district
    setSelectedLevel("district");
    const filteredTownships = districts?.filter((d) => d._id == districtId);
    console.log("filtered townships", filteredTownships);
    setTownships(filteredTownships[0]?.townships);
    setDistrictId(districtId);
    //set district positions
    // setPositions(positionData.data.filter((p) => p.level == "district"));
  };

  const handleTownshipSelectionChange = (townshipId) => {
    // set selected level as township
    setSelectedLevel("township");
    console.log("selected township id", townshipId);
    setTownshipId(townshipId);
    //set township positions
    // setPositions(positionData.data.filter((p) => p.level == "township"));
  };

  const handleStatusSelectionChange = (status) => {
    setStatus(status);
  };

  const handlePositionSelectionChange = (positionId) => {
    setPositionId(positionId);
  };

  // input change for tracking autocomplete cancellation
  const stateInputChange = (value) => {
    console.log("state value", value);
    if (value == "") {
      console.log("state close");
      setSelectedLevel(null);
    }
  };

  const districtInputChange = (value) => {
    console.log("district value", value);
    if (value == "") {
      console.log("district close");
      setSelectedLevel("state");
    }
  };
  const townshipInputChange = (value) => {
    console.log("township value", value);
    if (value == "") {
      console.log("township close");
      setSelectedLevel("district");
    }
  };

  console.log("states data", states);
  console.log("districts data", districts);
  console.log("selected level", selectedLevel);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      contact,
      state,
      district,
      township,
      recruitment_status,
      position,
    } = Object.fromEntries(new FormData(e.currentTarget));

    const stateId = states?.find((s) => s.name == state)?._id;
    const districtId = districts?.find((d) => d.name == district)?._id;
    const townshipId = townships?.find((t) => t.name == township)?._id;
    const positionId = positions?.find((p) => p.name == position)?._id;
    const status = recruitment_status == "ခန့်အပ်ပြီး" ? "A" : "C";

    console.log("submitted stateId", stateId);
    console.log("submitted districtId", districtId);
    console.log("submitted townshipId", townshipId);
    console.log("submitted positionId", positionId);

    mutate({
      payload: {
        name,
        contact,
        state: stateId,
        district: districtId,
        township: townshipId,
        recruitment_status: status,
        position: positionId,
      },
    });
  };

  useEffect(() => {
    if (createUnitSuccess) {
      handleOnClose();
    }
  }, [createUnitSuccess]);

  const handleOnClose = () => {
    setSelectedLevel(null);
    setStates([]);
    setDistricts([]);
    setTownships([]);
    setPositions([]);
    setStateId(null);
    setDistrictId(null);
    setTownshipId(null);
    setStatus(null);
    setPositionId(null);
    onClose();
  };

  // const { selectedState, selectedDistrict, selectedTownship } = useLocation();
  return (
    <Modal size="sm" isOpen={isOpen} onClose={handleOnClose}>
      {locationLoading && (
        <div>
          // loader
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
      )}
      {locationSuccess && locationData && (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a Unit
              </ModalHeader>
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    type="text"
                  />
                  <Input
                    name="contact"
                    label="Contact"
                    placeholder="Enter Contact"
                    type="text"
                  />
                  <Autocomplete
                    className="max-w-xs"
                    name="state"
                    defaultItems={states}
                    label="Burma States"
                    isLoading={locationLoading}
                    onInputChange={stateInputChange}
                    placeholder="Please Select a State Level"
                    onSelectionChange={handleStateSelectionChange}
                  >
                    {(state) => (
                      <AutocompleteItem key={state._id}>
                        {state.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  {districts?.length > 0 && (
                    <Autocomplete
                      className="max-w-xs"
                      name="district"
                      defaultItems={districts}
                      label="Burma Districts"
                      onInputChange={districtInputChange}
                      placeholder="Please Select a District Level"
                      onSelectionChange={handleDistrictSelectionChange}
                    >
                      {(district) => (
                        <AutocompleteItem key={district._id}>
                          {district.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                  {townships?.length > 0 && (
                    <Autocomplete
                      className="max-w-xs"
                      name="township"
                      defaultItems={townships}
                      label="Burma Townships"
                      onInputChange={townshipInputChange}
                      placeholder="Please Select a Township Level"
                      onSelectionChange={handleTownshipSelectionChange}
                    >
                      {(township) => (
                        <AutocompleteItem key={township._id}>
                          {township.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                  <Autocomplete
                    className="max-w-xs"
                    name="position"
                    defaultItems={positions ?? []}
                    label="Positions"
                    placeholder="Please Select a position"
                    isLoading={positionLoading}
                    onSelectionChange={handlePositionSelectionChange}
                  >
                    {(position) => (
                      <AutocompleteItem key={position._id}>
                        {position.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Autocomplete
                    className="max-w-xs"
                    name="recruitment_status"
                    defaultItems={statuses}
                    label="Statuses"
                    placeholder="Please Select a status"
                    onSelectionChange={handleStatusSelectionChange}
                  >
                    {(status) => (
                      <AutocompleteItem key={status.key}>
                        {status.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Cretae
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      )}
    </Modal>
  );
};

export default CreateModalAlpha;
