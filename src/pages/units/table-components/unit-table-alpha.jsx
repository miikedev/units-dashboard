"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  useDisclosure
} from "@heroui/react";
import { columnsAtom } from "../atoms/index.js";
import {
  useUnitCreateMutation,
  useUnitDeleteMutation,
} from "@/apis/unitsQuery.js";
import { useAtom } from "jotai";
import { Edit, Trash2 } from "lucide-react";
import EditModalAlpha from "./edit-modal-alpha.jsx";
import { useState } from "react";
import Loading from "@/components/Loading.jsx";

const UnitTableAlpha = ({ units, pagination, isSuccess, isLoading, setPage }) => {
  const [ editedUnit, setEditedUnit ] = useState(null)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [columns] = useAtom(columnsAtom);
  const { mutate } = useUnitCreateMutation();
  const { mutate: deleteMutate } = useUnitDeleteMutation();
  
  console.log("pagination", pagination);
  console.log("units", units);

  const handleUnitDelete = (unitId) => {
    deleteMutate({
      id: unitId,
    });
  };

  const renderLocationColumn = (item) => {
    const { state, district, township } = item;

    // Log the values for debugging
    console.log("state: ", state);
    console.log("district: ", district);
    console.log("township: ", township);

    // Ensure state is an object and has a `name` property
    const stateName = state?.name || "";
    const districtName = district?.name || "";
    const townshipName = township?.name || "";

    return (
      <div>
        <h1>{stateName}</h1>
        <h2>{districtName}</h2>
        <h3>{townshipName}</h3>
      </div>
    );
  };

  const renderCell = (unit, columnKey, id) => {

    const handleEditOpen = (unit) => {
      onOpen();
      // console.log('units', unit)
      setEditedUnit(unit)
    }

    switch (columnKey) {
      case "id":
        return <span>{id}</span>;
      case "name":
        return <span>{unit?.name}</span>;
      case "contact":
        return <span>{unit?.contact}</span>;
      case "position":
        return <span>{unit?.position.name}</span>;
      case "recruitment_status":
        return (
          <span>
            {unit?.recruitment_status == "A" ? "ခန့်အပ်ပြီး" : "မခန့်အပ်သေး"}
          </span>
        );
      case "location":
        return renderLocationColumn(unit);
      case "actions":
        return (
          <div className="flex justify-center space-x-2">
            <button onClick={() => handleEditOpen(unit)} className="p-1 hover:bg-gray-100 rounded">
              <Edit size={18} />
              <span className="sr-only">Edit</span>
            </button>
            <button
              onClick={() => handleUnitDelete(unit?._id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Trash2 size={18} className="text-red-500" />
              <span className="sr-only">Delete</span>
            </button>
          </div>
        );
      default:
        return <span>{unit[columnKey]}</span>;
    }
  };

  return (
    <div className="my-3">
      <EditModalAlpha unit={editedUnit} isOpen={isOpen} onClose={onClose} />
      <Table aria-label="Units table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
         isLoading={isLoading}
         loadingContent={<Loading />}
         >
          {isSuccess &&
            units?.length < 0 ? <TableRow><TableCell>No data!</TableCell></TableRow> :
            units?.map((unit, index) => (
              <TableRow key={unit._id}>
                {columns.map((column) => {
                  if (column.uid == "location") {
                    return (
                      <TableCell className="min-w-[5rem]">
                        {renderCell(unit, column.uid, index + 1)}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.uid}>
                      {renderCell(unit, column.uid, index + 1)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        className="my-3"
        showControls
        initialPage={pagination?.page}
        size={"sm"}
        total={pagination?.pages}
        onChange={setPage}
      />
    </div>
  );
};

export default UnitTableAlpha;
