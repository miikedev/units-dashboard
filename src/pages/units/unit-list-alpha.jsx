import { useUnitsQuery } from "@/apis/unitsQuery";
import UnitTableAlpha from "./table-components/unit-table-alpha";
import { pageAtom, unitsAtom, unitsPaginationAtom } from "./atoms/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
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
} from "@heroui/react";
import CreateModalAlpha from "./table-components/create-modal-alpha";
import { useLocationsQuery } from "@/apis/locationsQuery";
const UnitListAlpha = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useAtom(pageAtom);
  const [fetchedUnits, setFetchedUnits] = useAtom(unitsAtom);
  const [fetchedPagination, setFetchedPagination] =
    useAtom(unitsPaginationAtom);
  const {
    data: units,
    isLoading: unitsLoading,
    isSuccess: unitsSuccess,
    isError: unitsError,
  } = useUnitsQuery(page);
  const { data: locations } = useLocationsQuery();
  useEffect(() => {
    setFetchedUnits(units?.data);
    setFetchedPagination(units?.pagination);
  }, [units, unitsSuccess, page]);
  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <div className="mx-5">
        {/* <h1>Unit List Alpha</h1> */}
        <div className="flex justify-between">
          <Input startContent={<Search />} className="w-[16rem]" />
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
        />
      </div>
    </>
  );
};

export default UnitListAlpha;
