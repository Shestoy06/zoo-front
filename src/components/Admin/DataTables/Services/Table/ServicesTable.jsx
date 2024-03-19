import React from 'react';
import {Table, TableContainer, TableHead} from "@mui/material";
import {ServicesTableHead} from "./ServicesTableHead";
import ServicesTableBody from "./ServicesTableBody";
import ServicesNewModal from "../Modals/ServicesNewModal/ServicesNewModal";

const ServicesTable = ({services}) => {
    return (
        <div style={{backgroundColor: "white", borderRadius: 10}}>
            <ServicesNewModal title={"New service"}/>
            <TableContainer  style={{height: 'calc(100vh - 236px)', marginBottom: 30}}>
                <Table stickyHeader>
                    <TableHead>
                        <ServicesTableHead/>
                    </TableHead>
                    <ServicesTableBody services={services}/>
                </Table>
            </TableContainer>
        </div>
    )
};

export default ServicesTable;