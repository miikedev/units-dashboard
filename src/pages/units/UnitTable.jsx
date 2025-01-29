import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Radio,
    RadioGroup,
    Chip,
    Pagination
} from "@heroui/react";
import { RenderTableCells } from "./table-components/RenderCells";
import FilterCard from "./table-components/FilterCard";

export const columns = [
    {
        key: "name",
        label: "နာမည်",
    },
    {
        key: "လိပ်စာ",
        label: "CONTACT",
    },
    {
        key: "position_id",
        label: "ရာထူး",
    },
    {
        key: "level_details",
        label: "LOCATION",
    },
    {
        key: "status",
        label: "STATUS",
    },
    {
        key: "actions",
        label: "ACTIONS",
    }
];
export const statusColorMap = {
    true: "success",
    false: "warning",
};

export default function UnitTable({ units }) {
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    console.log('units', units)
    const renderCell = React.useCallback(RenderTableCells, []);
    return (
        <div className="flex flex-col gap-3 rounded-none">
            <FilterCard />
            <Table
                aria-label="Selection behavior table example with dynamic content"
                selectionBehavior={selectionBehavior}
                selectionMode="multiple"
                className="rounded-none"
                radius="none"
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>

                {/* <TableBody items={units?.data}>
                    {(item) => (
                        <TableRow key={item.code}>
                            {(columnKey) => {
                                // Get value once
                                const value = getKeyValue(item, columnKey);

                                // Render actions column
                                if (columnKey === "actions") {
                                    return (
                                        <TableCell>
                                            <div className="relative flex items-center gap-2">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon />
                                                </span>
                                                <span className="text-lg text-danger-400 cursor-pointer active:opacity-50">
                                                    <DeleteIcon />
                                                </span>
                                            </div>
                                        </TableCell>
                                    );
                                }

                                // Render boolean values with color-coded Chips
                                if (typeof value === "boolean") {
                                    return (
                                        <TableCell>
                                            <Chip
                                                className="capitalize"
                                                color={statusColorMap[value]}
                                                size="sm"
                                                variant="flat"
                                            >
                                                {value ? "ခန့်အပ်ပြီး" : "လျာထားပြီး"}
                                            </Chip>
                                        </TableCell>
                                    );
                                }


                                // Render regular values
                                return <TableCell>{value}</TableCell>;
                            }}
                        </TableRow>
                    )}
                </TableBody> */}
                <TableBody items={units?.data}>
                    {(item) => (
                        <TableRow key={item.code}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination radius="none" showControls initialPage={1} total={10} />
            <RadioGroup
                label="Selection Behavior"
                orientation="horizontal"
                value={selectionBehavior}
                onValueChange={setSelectionBehavior}
            >
                <Radio value="toggle">Toggle</Radio>
                <Radio value="replace">Replace</Radio>
            </RadioGroup>
        </div>
    );
}
