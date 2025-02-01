import React, { useEffect, useState, useMemo } from 'react'
import { districts, states, townships } from '@/utils/geo'
import { useAtom } from 'jotai'
import { QueryClient } from '@tanstack/react-query'
import { usePositionQuery, usePositionsByAllLevels } from '@/apis/positionsQuery';
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
    getKeyValue
} from '@heroui/react';
import { districtsAtom, statesAtom, townshipsAtom } from '@/atoms/positionsByLevelAtom';

// const columns = [
//   {
//     key: "id",
//     label: "စဥ်",
//   },
//   {
//     key: "location",
//     label: "နေရာ",
//   },
//   {
//     key: "role",
//     label: "ROLE",
//   },
//   {
//     key: "status",
//     label: "STATUS",
//   },
// ];
// const rows = [
//     {
//         id: 1,
//         location: "������������ ���������������������",

//     },
//     {
//         id: 2,
//         location: "၀င်၀၁၇ ၁၀၁၀၀ ၁၀၁၀၀၀၀၀၀၀၀၀၀၀၀၀၀၀၀၀၀",
//     }
// ]
const PositionListBeta = () => {
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [selectedLevel, setSelectedLevel] = useState('state')
    const [selectedPosition, setSelectedPositions] = useState([]);
    const { data } = usePositionQuery({ token: localStorage.getItem('token') });
    const { data: positionsByLevels, isSuccess, isPending, isError } = usePositionsByAllLevels({ token: localStorage.getItem('token') });
    const [statesData, setStatesData] = useAtom(statesAtom)
    const [districtsData, setDistrictsData] = useAtom(districtsAtom)
    const [townshipsData, setTownshipsData] = useAtom(townshipsAtom)

    useEffect(() => {
        if (positionsByLevels) {
            console.log('reach positinos')
            setStatesData([positionsByLevels?.state])
            setDistrictsData([positionsByLevels?.district])
            setTownshipsData([positionsByLevels?.township])
        }
    }, [positionsByLevels])

    const levels = [
        { key: 'state', label: 'ပြည်နယ်' },
        { key: 'district', label: 'ခရိုင်' },
        { key: 'township', label: 'မြို့နယ်' },
    ]
    // console.log('atom states data', statesData[0])
    // console.log('atom districts data', districtsData[0])
    // console.log('atom townships data', townshipsData[0])
    console.log('prefetched positions:', data)
    console.log('prefetch positions by levels:', positionsByLevels)
    console.log('states', states())
    console.log('districts', districts())
    console.log('townships', townships())

    useEffect(() => {
        if (!data) return;
      
        // Helper function to map positions into an object
        const mapPositionsToObject = (positions) =>
          positions.reduce((acc, position) => {
            acc[position.positionName] = position.status;
            return acc;
          }, {});
      
        // Helper function to generate rows based on the selected level
        const generateRows = (levelData, level) => {
          return levelData?.map((item, index) => {
            const positionsObject = mapPositionsToObject(item.positions);
            const baseRow = { id: index + 1 };
      
            if (level === 'state') {
              return { ...baseRow, state: item.state, ...positionsObject };
            } else if (level === 'district') {
              return { ...baseRow, state: item.state, district: item.district, ...positionsObject };
            } else if (level === 'township') {
              return { ...baseRow, state: item.state, district: item.district, township: item.township, ...positionsObject };
            }
            return baseRow;
          });
        };
      
        // Helper function to generate columns based on the selected level
        const generateColumns = (level) => {
          const baseColumns = [
            { key: "id", label: "စဥ်" },
            { key: "state", label: "ပြည်နယ်" },
          ];
      
          if (level === 'district') {
            baseColumns.push({ key: "district", label: "ခရိုင်" });
          } else if (level === 'township') {
            baseColumns.push({ key: "district", label: "ခရိုင်" }, { key: "township", label: "မြို့နယ်" });
          }
      
          return baseColumns;
        };
      
        // Main logic to filter positions and set rows/columns
        const filterPositions = () => {
          let rows = [];
          let columns = [];
      
          switch (selectedLevel) {
            case 'state':
              rows = generateRows(statesData[0], 'state');
              columns = generateColumns('state');
              break;
      
            case 'district':
              rows = generateRows(districtsData[0], 'district');
              columns = generateColumns('district');
              break;
      
            case 'township':
              rows = generateRows(townshipsData[0], 'township');
              columns = generateColumns('township');
              break;
      
            default:
              break;
          }
      
          // Generate column headers dynamically from data.positions
          const dynamicColumns = data?.positions
            .filter((d) => d.level === selectedLevel)
            .map((d) => ({ key: d.name, label: d.name }));
      
          columns = [...columns, ...dynamicColumns];
      
          // Sort rows by the "state" key alphabetically
          rows?.sort((a, b) => {
            const stateA = a.state || ''; // Fallback to empty string if undefined
            const stateB = b.state || '';
            return stateA.localeCompare(stateB); // Sort alphabetically
          });
      
          // Reassign sequential IDs after sorting
          rows = rows?.map((row, index) => ({
            ...row,
            id: index + 1, // Reassign IDs starting from 1
          }));
      
          // Update state with rows and columns
          setRows(rows);
          setColumns(columns);
          setSelectedPositions(rows);
        };
      
        filterPositions();
      }, [selectedLevel, data, statesData, districtsData, townshipsData, isSuccess]);
    console.log('selected level', selectedLevel)
    console.log('positions rows', rows)
    console.log('selected columns', columns)
    return (
        <div className='z-50 bg-white'>
            <div className='flex w-full items-end mt-3 justify-between'>
                <Autocomplete
                    radius='none'
                    defaultSelectedKey="state"
                    className={selectedLevel ? 'max-w-xs ml-5' : 'max-w-xs ml-5 ring-1 ring-danger-100'}
                    defaultItems={levels}
                    placeholder="နေရာရွေးပါ"
                    onSelectionChange={(key) => setSelectedLevel(key)}
                    classNames={{
                        listboxWrapper: "rounded-none",
                        listbox: "rounded-none",
                        base: "rounded-none",
                        popoverContent: "rounded-none",
                    }}
                    aria-label='နေရာရွးရန်'
                >
                    {(item) => <AutocompleteItem classNames={{
                        base: 'rounded-none',
                        selected: 'bg-blue-500',
                        list: "rounded-none"
                    }} key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                {!selectedLevel && <span className='mr-5 text-[1rem] text-opacity-75 font-bold text-red-500'>Please Select a Location!</span>}
            </div>
            <div className="w-full overflow-x-auto">
                <Table className='mt-3 min-w-full' radius='none' aria-label="Example static collection table">
                    <TableHeader
                        className="min-w-[150px] whitespace-nowrap" // Add minimum width
                        columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell className="truncate">{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default PositionListBeta