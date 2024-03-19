import React from 'react';
import {TableCell, TableRow} from "@mui/material";

export const ServicesTableHead = () => {
    const columns = ['ID', 'Name', 'Description', 'Actions']
    return (
        <TableRow>
            {columns.map(column => <TableCell key={columns.indexOf(column)} style={alignRight}>{column}</TableCell>)}
        </TableRow>
    )
}

const alignRight = {
    textAlign: 'right'
}