import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@heroui/react";
import { useAtom } from 'jotai';
import { inactivePageAtom } from '../units/atoms';
import Loading from '@/components/Loading';

const InactivePositionTable = ({ data, totalPages, loading }) => {
  console.log('inactive position table', data)
  const [page, setPage] = useAtom(inactivePageAtom)
  console.log('inactive page', page)
  return (
    <div>
      <Table aria-label="Example static collection table" radius='none'>
        <TableHeader>
          <TableColumn>ရာထူး</TableColumn>
          <TableColumn>Level</TableColumn>
          <TableColumn>Location</TableColumn>
        </TableHeader>
        <TableBody isLoading={loading} loadingContent={<Loading />}>
          {
            data &&
            data?.map(d => (<TableRow key="1">
              <TableCell>{d.position.name}</TableCell>
              <TableCell>
                {d.position.level == 'state' ?
                  'ပြည်နယ်/တိုင်းဒေသကြီး' :
                  d.position.level == 'disctrict' ?
                    'ခရိုင်' :
                    'မြို့နယ်'
                }</TableCell>
              <TableCell>
                {
                  d?.position.level == 'state' ? d?.state.name :
                    d?.position.level == 'district' ? d?.state.name + " , " + d?.district.name :
                      d?.state.name + " , " + d?.district.name + " , " + d?.township.name
                }
              </TableCell>
            </TableRow>))
          }
        </TableBody>
      </Table>
      <div className='flex justify-end mt-3'>
        <Pagination
          showControls
          showShadow
          color="primary"
          size="sm"
          initialPage={1}
          total={totalPages}
          onChange={setPage}
        />
       </div>
       </div>
  );
}

export default InactivePositionTable