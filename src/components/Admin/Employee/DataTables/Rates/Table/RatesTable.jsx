import React from 'react';
import {Table, TableContainer, TableHead} from "@mui/material";
import RatesTableHead from "./RatesTableHead";
import RatesTableBody from "./RatesTableBody";

const RatesTable = ({rates}) => {
    return (
        <div style={{backgroundColor: "white", borderRadius: 10}}>
            <TableContainer  style={{height: 'calc(100vh - 236px)', marginBottom: 30}}>
                <Table stickyHeader>
                    <TableHead>
                        <RatesTableHead/>
                    </TableHead>
                    <RatesTableBody rates={rates}/>
                </Table>
            </TableContainer>
        </div>
    )
};

export default RatesTable;