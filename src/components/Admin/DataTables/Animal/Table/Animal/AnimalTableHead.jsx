import {TableCell, TableRow} from "@mui/material";
import React from "react";

export const AnimalExtendedTableHead = () => {
    const AdditionalInfoHeadColumns = ['ID', 'Name', 'Species', 'Habitat', 'Vet. review', 'Food type', 'Food quantity', 'Last review', 'Details', 'Image', 'Actions']
    return (
        <TableRow>
            {AdditionalInfoHeadColumns.map(column => <TableCell key={AdditionalInfoHeadColumns.indexOf(column)} style={alignRight}>{column}</TableCell>)}
        </TableRow>
    )
}

const alignRight = {
    textAlign: 'right'
}
