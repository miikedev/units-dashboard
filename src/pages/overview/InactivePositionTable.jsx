import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";

const InactivePositionTable = ({data}) => {
    console.log(data)
    return (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ရာထူး</TableColumn>
            <TableColumn>Level</TableColumn>
          </TableHeader>
          <TableBody>
            {
                data && 
                data?.map(d => (<TableRow key="1">
                    <TableCell>{d.name}</TableCell>
                    <TableCell>
                        {d.level == 'state' ? 
                                    'ပြည်နယ်/တိုင်းဒေသကြီး': 
                        d.level == 'disctrict'?
                        'ခရိုင်':
                        'မြို့နယ်'
                        }</TableCell>
                </TableRow>))
            }
          </TableBody>
        </Table>
      );
}

export default InactivePositionTable