import {Button, Paper, Table, TableContainer, TableHead} from "@mui/material";
import {AnimalExtendedTableHead, AnimalTableHead} from "./AnimalTableHead";
import {AnimalExtendedTableBody, AnimalTableBody} from "./AnimalTableBody";
import React, {useState} from "react";

const AnimalTable = ({animal, deleteAnimal}) => {
    const [showExtendedInfo, setShowExtendedInfo] = useState(false)

    const toggleInfo = () => {
        if (showExtendedInfo === false) setShowExtendedInfo(true)
        else setShowExtendedInfo(false)
    }

    return (
        <TableContainer component={Paper}>
            <Button onClick={toggleInfo}>More Info</Button>
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