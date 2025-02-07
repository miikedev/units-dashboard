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
        const filterPositions = () => {
            switch (selectedLevel) {
                case 'state':
                    // setRows(states().map((s, i) => ({ id: i + 1, "state": s })));
                    const mapStates = statesData[0].map((item, index) => {
                        console.log('mapState', item);

                        // Assuming `item.positions` contains the positions array
                        const positionsObject = item.positions.reduce((acc, position) => {
                            acc[position.positionName] = position.status; // Add positionName: status to the object
                            return acc;
                        }, {});

                        return {
                            id: index + 1,
                            state: item.state,
                            ...positionsObject, // Spread the positions object into the result
                        };
                    });

                    console.log('mapStates', mapStates)
                    setRows([...mapStates]);
                    // setRows([...statesData.map((item, i) => {
                    //     return ({ id: i + 1, state : s.state })
                    // })]);
                    let s = ((data.positions.filter(d => d.level === 'state')).map(d => ({ key: d.name, label: d.name })))
                    s.unshift({
                        key: "id",
                        label: "စဥ်",
                    }, { key: 'state', label: 'ပြည်နယ်' });
                    return s;
                case 'district':
                    const mapDistricts = districtsData[0].map((item, index) => {
                        console.log('mapDistrict', item)
                        const positionsObject = item.positions.reduce((acc, position) => {
                            acc[position.positionName] = position.status; // Add positionName: status to the object
                            return acc;
                        }, {});
                        return {
                            id: index + 1,
                            state: item.state,
                            district: item.district,
                            ...positionsObject
                        }
                    })
                    console.log('mapDistricts', mapDistricts)
                    setRows([...mapDistricts]);
                    // setRows(districts().map((s, i) => ({ id: i + 1, "state": s.state, "district": s.district })));
                    let d = ((data.positions.filter(d => d.level === 'district')).map(d => ({ key: d.name, label: d.name })))
                    d.unshift({
                        key: "id",
                        label: "စဥ်",
                    }, { key: 'state', label: 'ပြည်နယ်' }, { key: 'district', label: 'ခရိုင်' });
                    return d;
                case 'township':
                    const mapTownships = townshipsData[0].map((item, index) => {
                        console.log('mapTownship', item)
                        const positionsObject = item.positions.reduce((acc, position) => {
                            acc[position.positionName] = position.status; // Add positionName: status to the object
                            return acc;
                        }, {});
                        return {
                            id: index + 1,
                            state: item.state,
                            district: item.district,
                            township: item.township,
                            ...positionsObject
                        }
                    })
                    console.log('mapTownships', mapTownships)
                    setRows([...mapTownships])
                    // setRows(townships().map((s, i) => ({ id: i + 1, "state": s.state, "district": s.district, "township": s.township })))
                    let t = ((data.positions.filter(d => d.level === 'township')).map(d => ({ key: d.name, label: d.name })))
                    t.unshift({
                        key: "id",
                        label: "စဥ်",
                    }, { key: 'state', label: 'ပြည်နယ်' }, { key: 'district', label: 'ခရိုင်' }, { key: 'township', label: 'မြို့နယ်' });
                    return t;
                default:
                    return [];
            }
        };
        const data2 = filterPositions();
        console.log('data2', data2)
        setColumns([...data2])
        setSelectedPositions(filterPositions());
    }, [selectedLevel, data]);
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