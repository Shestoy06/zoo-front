import {Button, FormControlLabel, FormGroup, Paper, Table, TableContainer, TableHead} from "@mui/material";
import {AnimalExtendedTableHead} from "./AnimalTableHead";
import {AnimalExtendedTableBody, AnimalTableBody} from "./AnimalTableBody";
import React, {useState} from "react";
import Switch from '@mui/material/Switch';
import AnimalNewModal from "../../Modals/AnimalNewModal/AnimalNewModal";

const AnimalTable = ({animal, deleteAnimal}) => {

    return (
        <div style={{backgroundColor: "white", borderRadius: 10}}>
            <AnimalNewModal title={"New animal"}/>
            <TableContainer  style={{height: 'calc(100vh - 236px)', marginBottom: 30}}>
                <Table stickyHeader>
                    <TableHead>
                        <AnimalExtendedTableHead/>
                    </TableHead>

                    <AnimalTableBody animal={animal} deleteAnimal={deleteAnimal}/>

                </Table>
            </TableContainer>
        </div>
    )
}

export default AnimalTable