import { Chip } from "@heroui/react";
import { QueryClient } from "@tanstack/react-query";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { statusColorMap } from "../unit-table";
import { pageAtom } from "../atoms";
import { useAtom } from "jotai";
const queryClient = new QueryClient();
// Function to render the name column
const renderNameColumn = (cellValue) => {
    return <h1>{cellValue}</h1>;
};

// Function to render the contact column
const renderContactColumn = (cellValue) => {
    return <h1>{cellValue}</h1>;
};

// Function to render the position_id column
const renderPositionColumn = (cellValue) => {
    return <h1>{cellValue.name}</h1>;
};

// Function to render the level_details column
const renderLocationColumn = (cellValue) => {
    let locationString = "";
    if (cellValue.state?.name) {
        locationString += cellValue.state.name;
    }
    if (cellValue.district?.name) {
        locationString += (locationString ? ", " : "") + cellValue.district.name;
    }
    if (cellValue.township?.name) {
        locationString += (locationString ? ", " : "") + cellValue.township.name;
    }
    return <span>{locationString || "No location data"}</span>;
};

// Function to render the status column
const renderStatusColumn = (cellValue) => {
    return (
        <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
            {cellValue ? "ခန့်အပ်ပြီး" : "မခန့်အပ်သေး"}
        </Chip>
    );
};

// Function to render the actions column
const renderActionsColumn = ({ _id: unitId }, page, mutate, handleEditClick, prefetchedUnit) => {
    console.log('item', unitId)
    console.log('page', page)
    const handleUnitDelete = (id, page) => {
        console.log('id', id)
        console.log('page', page)
        mutate({ id, page })
    }
    return (
        <div className="relative flex items-center justify-start gap-2" onMouseEnter={() => prefetchedUnit(unitId)}>
            <span onClick={() => {
                handleEditClick(unitId)
            }} className={queryClient.getQueryData([`units/${unitId}`]) ? 'text-green-500 bg-black cursor-pointer active:opacity-50' : ''}>
                <EditIcon />
            </span>
            <span onClick={() => handleUnitDelete(unitId, page)} className="text-lg text-danger-400 cursor-pointer active:opacity-50">
                <DeleteIcon />
            </span>
        </div>
    );
};

// Main function to render table cells
export const RenderTableCells = (item, columnKey, page, mutate, handleEditClick, prefetchedUnit) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
        case "name":
            return renderNameColumn(cellValue);
        case "contact":
            return renderContactColumn(cellValue);
        case "position_id":
            return renderPositionColumn(cellValue);
        case "level_details":
            return renderLocationColumn(cellValue);
        case "status":
            return renderStatusColumn(cellValue);
        case "actions":
            return renderActionsColumn(item, page, mutate, handleEditClick, prefetchedUnit);
        default:
            return cellValue;
    }
};