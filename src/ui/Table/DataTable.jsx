import React from 'react';
import {Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const DataTable = ({ data }) => {
    // Check if data is not null or undefined
    if (!data) return null;
    const dataObject = data


    const columns = []
    for (let prop in dataObject[0]) {
        columns.push(prop)
    }

    columns.map(val => console.log(val))

    const rows = []
    for (let i = 0; i < dataObject.length; i++) {
        let rowArray = []
        for (let value in dataObject[i]) {
            if (typeof dataObject[i][value] === 'object') {
                if (dataObject[i][value] !== null) {
                    if(value === 'animalHabitat') {
                        rowArray.push(dataObject[i][value].name)

                    }
                }
                else {
                    rowArray.push('-')
                }
            }
            else if (Array.isArray(dataObject[i][value]) === true) {
                if (dataObject[i][value][0] !== null) {
                    rowArray.push(dataObject[i][0][value][1])
                }
            }
            else {
                rowArray.push(dataObject[i][value])
            }
        }
        rows.push(rowArray)
    }
    console.log(rows)

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const alignRight = {
        textAlign: 'right'
    }

    return (
        <TableContainer component={Paper} style={{ marginRight: 40, borderRadius: 20, border: '1px solid black' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell style={alignRight}>{column}</TableCell>
                        ))}
                        <TableCell style={alignRight}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                            {row.map(value => {
                                return <TableCell style={alignRight}>{value}</TableCell>
                            })}
                            <TableCell style={{ display: "flex", gap: 10, alignItems: 'center', justifyContent: 'right', maxWidth: '100%' }}>
                                <Button style={{ textTransform: 'none', backgroundColor: "#2bb621" }} disableElevation variant="contained">Add</Button>
                                <div>hello</div>
                                <div>hello</div>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
