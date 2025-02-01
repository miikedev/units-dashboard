import Loading from "@/components/Loading";
import { Card, CardBody, Chip, getKeyValue, Pagination, Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react";
import {useState, useCallback, useEffect} from "react";

import FilterCard from "./table-components/FilterCard";
import { RenderTableCells } from "./table-components/RenderCells";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms";
import { useUnitDeleteMutation } from "@/apis/unitsQuery";
import EditModal from "./table-components/EditModal";
import { QueryClient } from "@tanstack/react-query";
import { fetchUnitById } from "@/apis/units";

export const columns = [
    {
        key: "name",
        label: "နာမည်",
    },
    {
        key: "contact",
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
const queryClient = new QueryClient()

export default function UnitTable({ units, isSuccess, isPending, pagination, isPositionSuccess }) {
    const [selectionBehavior, setSelectionBehavior] = useState(false);
    const [page, setPage] = useAtom(pageAtom)
    const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
    const [editedId, setEditedId] = useState('')
    useEffect(() => {
        if (!editIsOpen) {
            console.log('Modal closed');
            setEditedId('')
          }
    },[editIsOpen])
    const rerender = useState(0)[1]

    const {mutate, isSuccess: isMutateSuccess, isPending: isMutatePending} = useUnitDeleteMutation();
    const prefetchedUnit = async (id) => {
        try {
          // Prefetch the data using React Query
          await queryClient.prefetchQuery({
            queryKey: ['units',id],
            queryFn: () => fetchUnitById(id),
            staleTime: 5 * 1000, // Data will be fresh for 20 seconds
          });
        } catch (error) {
          console.error("Prefetch failed:", error);
          // Handle error appropriately
        }
      };
    const renderCell = useCallback(RenderTableCells, []);
    const handleEditClick = (id) => {
        // alert(id)
        console.log(editOnOpen)
        setEditedId(id)
        editOnOpen()
    }
    console.log('edited id', editedId)
    console.log('fetch units', units)
    console.log('current page', page)
    console.log('pagination', pagination)
    return (
        <div className="flex flex-col gap-3 rounded-none">
            <FilterCard selectionBehavior={selectionBehavior} setSelectionBehavior={setSelectionBehavior} />
            {isPending && <Card radius="none">
                <CardBody>
                    <Loading />
                </CardBody>
            </Card>}
            {isSuccess && <Table
                aria-label="Selection behavior table example with dynamic content"
                selectionBehavior={selectionBehavior ? 'toggle' : 'replace'}
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
                <TableBody items={units?.data || []}>
                {/* <TableBody items={[]}> */}
                    {(item) => (
                        <TableRow key={item.code}>
                            {(columnKey) => <TableCell className="">{renderCell(item, columnKey, page, mutate, handleEditClick, prefetchedUnit)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
            <Pagination 
                page={pagination?.currentPage}
                total={pagination?.totalPages}
                onChange={(page) => setPage(page)}
                radius="none" 
                color="default"
                showControls 
                initialPage={1} 
            />
            <RadioGroup
                label="Selection Behavior"
                orientation="horizontal"
                value={selectionBehavior}
                onValueChange={setSelectionBehavior}
            >
                <Radio value="toggle">Toggle</Radio>
                <Radio value="replace">Replace</Radio>
            </RadioGroup>
            {isPositionSuccess && <EditModal id={editedId} isOpen={editIsOpen} onClose={editOnClose} />}

        </div>
    );
}
