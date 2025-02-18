import { useUnitsQuery } from "@/apis/unitsQuery";
import UnitTableAlpha from "./table-components/unit-table-alpha";
import { pageAtom, unitsAtom, unitsPaginationAtom } from "./atoms/index";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus, Search } from "lucide-react";
import {
  Tooltip,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem
} from "@heroui/react";
import CreateModalAlpha from "./table-components/create-modal-alpha";
import { useLocationsQuery } from "@/apis/locationsQuery";
const statuses = [
  {key: "A", label: "ခန့်အပ်ပြီး"},
  {key: "C", label: "မခန့်သေး"}
];
const UnitListAlpha = () => {
  const [filter, setFilter] = useState(null); // Initialize with an empty string
  const [filterStatus, setFilterStatus] = useState(null);
  const debounceFilter = useDebounce(filter, 300);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useAtom(pageAtom);
  const [fetchedUnits, setFetchedUnits] = useAtom(unitsAtom);
  const [fetchedPagination, setFetchedPagination] = useAtom(unitsPaginationAtom);
  console.log('debounce filter: ', debounceFilter)
  const {
    data: units,
    isLoading: unitsLoading,
    isSuccess: unitsSuccess,
    isError: unitsError,
  } = useUnitsQuery({ page, search: debounceFilter, status: filterStatus});

  const { data: locations } = useLocationsQuery();

  useEffect(() => {
    if (unitsSuccess) {
      setFetchedUnits(units?.data);
      setFetchedPagination(units?.pagination);
    }
  }, [units, unitsSuccess, page]);

  const handleOpen = () => {
    onOpen();
  };

  const handleSearchInputChange = (e) => {
    console.log('onSearchInputChange', e.target.value);
    setFilter(e.target.value);
  };
  const animals = [
    {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
    {label: "Dog", key: "dog", description: "The most popular pet in the world"},
    {label: "Elephant", key: "elephant", description: "The largest land animal"},
    {label: "Lion", key: "lion", description: "The king of the jungle"},
    {label: "Tiger", key: "tiger", description: "The largest cat species"},
    {label: "Giraffe", key: "giraffe", description: "The tallest land animal"},
  ]
  return (
    <>
      <div className="mx-5">
        {/* <h1>Unit List Alpha</h1> */}
        <div className="flex justify-between">
          <div className="flex gap-3">
          <Input startContent={<Search />} className="w-[16rem]" onChange={handleSearchInputChange} placeholder="Search by Name ..." />
          <Autocomplete
            className="w-[12rem]"
            defaultItems={statuses}
            // defaultSelectedKey=""
            placeholder="Search Status ..."
            onSelectionChange={setFilterStatus}
          >
            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
          </Autocomplete>
          </div>
          <Tooltip content="create a unit">
            <button
              onClick={handleOpen}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus />
            </button>
          </Tooltip>
          <CreateModalAlpha isOpen={isOpen} onClose={onClose} />
        </div>
        <UnitTableAlpha
          isLoading={unitsLoading}
          isSuccess={unitsSuccess}
          units={fetchedUnits}
          pagination={fetchedPagination}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default UnitListAlpha;
