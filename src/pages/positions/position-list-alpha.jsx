import React, { useEffect, useState } from "react";
import {
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Autocomplete,
    AutocompleteItem,
    getKeyValue,
    select,
    Pagination,
} from "@heroui/react";
import { usePositionStatusQuery } from "@/apis/positionStatusQuery";
import { usePositionQuery } from "@/apis/positionsQuery";
import { groupByLevel } from "@/utils";

const levels = [
    { key: "state", label: "ပြည်နယ်" },
    { key: "district", label: "ခရိုင်" },
    { key: "township", label: "မြို့နယ်" },
];

const PositionListAlpha = () => {
    const [page, setPage] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState("state");
    const [positions, setPositions] = useState([]);
    const [positionStatuses, setPositionStatuses] = useState([]);
    const [positionStatusPagination, setPositionStatusPagination] = useState(
        {},
    );
    const [columns, setColumns] = useState([]);
    console.log("current page", page);
    const { data, isSuccess: isPositionSuccess } = usePositionQuery();
    const limit =
        selectedLevel === "state"
            ? 44
            : selectedLevel === "district"
              ? 70
              : 100;

    const { data: positionStatusData } = usePositionStatusQuery({
        type: selectedLevel,
        page,
        limit,
    });

    useEffect(() => {
        if (isPositionSuccess && data?.data) {
            // Set positions directly within a single state instead of multiple
            const positionsByLevel = {
                state: [],
                district: [],
                township: [],
            };

            data.data.forEach((item) => {
                if (positionsByLevel[item.level]) {
                    positionsByLevel[item.level].push(item);
                }
            });

            setPositions(positionsByLevel); // Use a single state for positions
        }
    }, [data, isPositionSuccess]);

    useEffect(() => {
        if (positionStatusData && positionStatusData.data) {
            let results = groupByLevel(
                positionStatusData.data.results,
                selectedLevel,
            )
                .map((i, j) => ({
                    id: j + 1,
                    ...i,
                }))
                .map((i) => transformToSingleRow(i));
            setPositionStatuses([...results]);
            setPositionStatusPagination({
                page: positionStatusData.data.page,
                limit: positionStatusData.data.limit,
                totalPages: positionStatusData.data.totalPages,
                totalResults: positionStatusData.data.totalResults,
            });
            // setPositionStatusPagination()
        }
    }, [positionStatusData, selectedLevel]); // Don't need additional if for positionStatusData existence
    console.log("position status pagination", positionStatusPagination);
    useEffect(() => {
        const newColumns = [
            { key: "id", label: "စဥ်" },
            { key: "state", label: "ပြည်နယ်" },
        ];

        if (selectedLevel === "district") {
            newColumns.push({ key: "district", label: "ခရိုင်" });
        } else if (selectedLevel === "township") {
            newColumns.push(
                { key: "district", label: "ခရိုင်" },
                { key: "township", label: "မြို့နယ်" },
            );
        }

        // Dynamically add position related columns
        const levelPositions = positions[selectedLevel] || [];

        const results = levelPositions?.map((s) => ({
            key: s.name,
            label: s.name,
        }));
        newColumns.push(...results.reverse());

        setColumns(newColumns);
    }, [selectedLevel, positions]); // Depend on `positions` instead of individual state states

    console.log("Positions:", positions);
    console.log("Position Statuses:", positionStatuses);
    console.log("Columns:", columns);

    const transformToSingleRow = (data) => {
        console.log("data", data);

        const { id, state, district, township, positions } = data; // Destructure data

        // Initialize the result object with id
        const result = { id: id };

        // Check and add fields based on data availability
        if (township) {
            // If township is available, include state, district, and township
            result.state = township?.state || ""; // Get the state from the district object
            result.district = township?.district || ""; // Get the district name from the district object
            result.township = township.township || ""; // Get the township from the township object
        } else if (district) {
            // If only district is available, include state and district
            result.state = district?.state || ""; // Get the state from the district object
            result.district = district?.district || ""; // Get the district name from the district object
        } else {
            // If only state is included in the district object
            result.state = state?.state || ""; // Get the state from the district object
        }

        // Add each position name and its status dynamically
        positions?.forEach((position) => {
            result[position.name] = position.status; // Use position name as key
        });

        return result; // Return the transformed object
    };
    const renderCell = React.useCallback((status, columnKey) => {
        const cellValue = status[columnKey];
        console.log("status", status);
        console.log("column key", columnKey);
        console.log("value", cellValue);
        switch (columnKey) {
            case "id":
                return <span>{cellValue}</span>;
            case "state":
                return <span>{cellValue}</span>;
            case "district":
                return <span>{cellValue}</span>;
            case "township":
                return <span>{cellValue}</span>;
            default:
                return cellValue;
        }
    }, []);
    return (
        <div className="z-50 bg-white">
            <div className="flex w-full items-end mt-3 justify-between">
                <Autocomplete
                    radius="none"
                    defaultSelectedKey="state"
                    className="max-w-xs ml-5"
                    defaultItems={levels}
                    placeholder="နေရာရွေးပါ"
                    onSelectionChange={(key) => {
                        setSelectedLevel(key);
                        setPage(1);
                    }}
                    classNames={{
                        listboxWrapper: "rounded-none",
                        listbox: "rounded-none",
                        base: "rounded-none",
                        popoverContent: "rounded-none",
                    }}
                    aria-label="နေရာရွးရန်"
                >
                    {(item) => (
                        <AutocompleteItem
                            classNames={{
                                base: "rounded-none",
                                selected: "bg-blue-500",
                                list: "rounded-none",
                            }}
                            key={item.key}
                        >
                            {item.label}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            </div>
            <div className="w-full overflow-x-auto">
                <Table
                    className="mt-3 min-w-full"
                    radius="none"
                    aria-label="Example static collection table"
                >
                    <TableHeader
                        className="min-w-[5px] whitespace-nowrap" // Add minimum width
                        columns={columns}
                    >
                        {(column) => (
                            <TableColumn key={column.key}>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={positionStatuses}>
                        {(item) => {
                            return (
                                <TableRow key={item.id}>
                                    {(columnKey) => {
                                        console.log(item[columnKey]);
                                        if (item[columnKey] == "A") {
                                            return (
                                                <TableCell
                                                    key={columnKey}
                                                    className="bg-green-200"
                                                >
                                                    ခန့်အပ်ပြီး
                                                </TableCell>
                                            );
                                        }
                                        if (item[columnKey] == "C") {
                                            return (
                                                <TableCell
                                                    key={columnKey}
                                                    className="bg-yellow-200"
                                                >
                                                    မခန့်အပ်သေး
                                                </TableCell>
                                            );
                                        }
                                        if (
                                            columnKey !== "id" &&
                                            columnKey !== "state" &&
                                            columnKey !== "district" &&
                                            columnKey !== "township"
                                        ) {
                                            return (
                                                <TableCell
                                                    key={columnKey}
                                                    className="bg-slate-50"
                                                >
                                                    လစ်လပ်ရာထူး
                                                </TableCell>
                                            );
                                        }
                                        if (columnKey === "id") {
                                            return (
                                                <TableCell
                                                    key={columnKey}
                                                    className="bg-slate-50 w-[3rem]"
                                                >
                                                    {renderCell(
                                                        item,
                                                        columnKey,
                                                    )}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell className="">
                                                {renderCell(item, columnKey)}
                                            </TableCell>
                                        );
                                    }}
                                </TableRow>
                            );
                        }}
                    </TableBody>
                </Table>
                <div className="flex justify-start w-[95%] my-3 mx-2">
                    {(selectedLevel == "township" ||
                        selectedLevel == "district") && (
                        <Pagination
                            showShadow
                            color="primary"
                            size="sm"
                            initialPage={1}
                            total={positionStatusPagination?.totalPages}
                            onChange={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PositionListAlpha;
