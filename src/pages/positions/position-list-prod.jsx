import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Autocomplete, AutocompleteItem } from '@heroui/react';
import { usePositionQuery, usePositionsByAllLevels } from '@/apis/positionsQuery';
import { statesAtom, districtsAtom, townshipsAtom } from '@/atoms/positionsByLevelAtom';

const PositionListProd = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('state');
  const [selectedPositions, setSelectedPositions] = useState([]);

  // Fetch data using react-query
  const { data: positionsData } = usePositionQuery({ token: localStorage.getItem('token') });
  const { data: positionsByLevels, isSuccess } = usePositionsByAllLevels({ token: localStorage.getItem('token') });

  // Atoms for state, district, and township data
  const [statesData, setStatesData] = useAtom(statesAtom);
  const [districtsData, setDistrictsData] = useAtom(districtsAtom);
  const [townshipsData, setTownshipsData] = useAtom(townshipsAtom);

  // Levels dropdown options
  const levels = [
    { key: 'state', label: 'ပြည်နယ်' },
    { key: 'district', label: 'ခရိုင်' },
    { key: 'township', label: 'မြို့နယ်' },
  ];

  // Helper function to map positions into an object
  const mapPositionsToObject = (positions) =>
    positions.reduce((acc, position) => {
      acc[position.positionName] = position.status;
      return acc;
    }, {});

  // Helper function to generate rows based on selected level
  const generateRows = (data, level) => {
    switch (level) {
      case 'state':
        return data.map((item, index) => ({
          id: index + 1,
          state: item.state,
          ...mapPositionsToObject(item.positions),
        }));

      case 'district':
        return data.map((item, index) => ({
          id: index + 1,
          state: item.state,
          district: item.district,
          ...mapPositionsToObject(item.positions),
        }));

      case 'township':
        return data.map((item, index) => ({
          id: index + 1,
          state: item.state,
          district: item.district,
          township: item.township,
          ...mapPositionsToObject(item.positions),
        }));

      default:
        return [];
    }
  };

  // Helper function to generate columns based on selected level
  const generateColumns = (level) => {
    const baseColumns = [
      { key: 'id', label: 'စဥ်' },
      { key: 'state', label: 'ပြည်နယ်' },
    ];

    if (level === 'district') {
      baseColumns.push({ key: 'district', label: 'ခရိုင်' });
    } else if (level === 'township') {
      baseColumns.push({ key: 'district', label: 'ခရိုင်' });
      baseColumns.push({ key: 'township', label: 'မြို့နယ်' });
    }

    return baseColumns;
  };

  // Update state, district, and township data when positionsByLevels is fetched
  useEffect(() => {
    if (isSuccess && positionsByLevels) {
      setStatesData([positionsByLevels?.state]);
      setDistrictsData([positionsByLevels?.district]);
      setTownshipsData([positionsByLevels?.township]);
    }
  }, [isSuccess, positionsByLevels]);

  // Update rows and columns when selectedLevel or positionsData changes
  useEffect(() => {
    if (!positionsData) return;

    // Generate rows based on the selected level
    let rowData = [];
    switch (selectedLevel) {
      case 'state':
        rowData = generateRows(statesData[0], 'state');
        break;
      case 'district':
        rowData = generateRows(districtsData[0], 'district');
        break;
      case 'township':
        rowData = generateRows(townshipsData[0], 'township');
        break;
      default:
        break;
    }
    setRows(rowData);

    // Generate columns based on the selected level
    const columnData = generateColumns(selectedLevel);
    setColumns(columnData);
  }, [selectedLevel, positionsData, statesData, districtsData, townshipsData]);

  return (
    <div className="z-50 bg-white">
      {/* Level Selection Dropdown */}
      <div className="flex w-full items-end mt-3 justify-between">
        <Autocomplete
          radius="none"
          defaultSelectedKey="state"
          className={selectedLevel ? 'max-w-xs ml-5' : 'max-w-xs ml-5 ring-1 ring-danger-100'}
          defaultItems={levels}
          placeholder="နေရာရွေးပါ"
          onSelectionChange={(key) => setSelectedLevel(key)}
          classNames={{
            listboxWrapper: 'rounded-none',
            listbox: 'rounded-none',
            base: 'rounded-none',
            popoverContent: 'rounded-none',
          }}
          aria-label="နေရာရွးရန်"
        >
          {(item) => (
            <AutocompleteItem
              classNames={{
                base: 'rounded-none',
                selected: 'bg-blue-500',
                list: 'rounded-none',
              }}
              key={item.key}
            >
              {item.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
        {!selectedLevel && (
          <span className="mr-5 text-[1rem] text-opacity-75 font-bold text-red-500">Please Select a Location!</span>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <Table className="mt-3 min-w-full" radius="none" aria-label="Example static collection table">
          <TableHeader className="min-w-[150px] whitespace-nowrap" columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell className="truncate">{item[columnKey]}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PositionListProd;