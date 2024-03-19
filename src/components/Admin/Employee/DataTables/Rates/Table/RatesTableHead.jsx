import React from 'react';
import {TableCell, TableRow} from "@mui/material";

const RatesTableHead = () => {
    const columns = ['ID', 'Pseudo', 'Message', 'Status', 'Actions']
    return (
        <TableRow>
            {columns.map(column => <TableCell key={columns.indexOf(column)} style={alignRight}>{column}</TableCell>)}
        </TableRow>
    )
};

const alignRight = {
    textAlign: 'right'
}
export default RatesTableHead;