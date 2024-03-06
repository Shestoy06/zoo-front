import {Button, FormControlLabel, FormGroup, Paper, Table, TableContainer, TableHead} from "@mui/material";
import {AnimalExtendedTableHead, AnimalTableHead} from "./AnimalTableHead";
import {AnimalExtendedTableBody, AnimalTableBody} from "./AnimalTableBody";
import React, {useState} from "react";
import Switch from '@mui/material/Switch';
import AnimalNewModal from "../Modals/AnimalNewModal/AnimalNewModal";

const AnimalTable = ({animal, deleteAnimal}) => {
    const [showExtendedInfo, setShowExtendedInfo] = useState(false)

    const toggleInfo = () => {
        if (showExtendedInfo === false) setShowExtendedInfo(true)
        else setShowExtendedInfo(false)
    }

    return (
        <TableContainer component={Paper}>
            <FormGroup>
                <FormControlLabel control={<Switch onClick={toggleInfo}/>} label="More info" />
                <AnimalNewModal title={"New animal"}/>
            </FormGroup>
            <Table>
                <TableHead>
                    {showExtendedInfo ?
                        <AnimalExtendedTableHead/>
                        :
                        <AnimalTableHead/>}
                </TableHead>
                {showExtendedInfo ?
                    <AnimalExtendedTableBody animal={animal} deleteAnimal={deleteAnimal}/>
                    :
                    <AnimalTableBody animal={animal} deleteAnimal={deleteAnimal}/>}
            </Table>
        </TableContainer>
    )
}

export default AnimalTable