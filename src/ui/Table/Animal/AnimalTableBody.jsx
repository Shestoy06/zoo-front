import {Button, styled, TableBody, TableCell, TableRow} from "@mui/material";
import {StyledTableRow} from "../StyledTableRow";
import React from "react";
import AnimalImageModal from "../../Animal/Modals/AnimalImageModal";

export const AnimalTableBody = ({animal = [], deleteAnimal, showImage}) => {
    return (
        <TableBody>
            {
                animal.map((row, index) => (
                    <StyledTableRow key={index} style={{padding: 50}}>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.species}</StyledTableCell>
                        <StyledTableCell>{row.animalHabitat ? row.animalHabitat.name : "-"}</StyledTableCell>
                        <StyledTableCell>{row.details === null ? '-' : row.details}</StyledTableCell>
                        <StyledTableCell>{row.animalImages ? row.animalImages.map(el => el.ImageFileName) : "-"}</StyledTableCell>
                        <StyledTableCell>
                            <ButtonsRowAndModal animalId={row.id}
                                        imageId={row.animalImages.length ? row.animalImages.map(el => el.id) : null}
                                        deleteAnimal={deleteAnimal}
                                        showImage={showImage}/>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </TableBody>)
}

export const AnimalExtendedTableBody = ({animal = [], deleteAnimal, showImage}) => {
    return(
        <TableBody>
            {
                animal.map((row, index) => (
                    <StyledTableRow key={index}>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.species}</StyledTableCell>
                        <StyledTableCell>{row.animalHabitat ? row.animalHabitat.name : "-" }</StyledTableCell>
                        <StyledTableCell>{row.vet_review}</StyledTableCell>
                        <StyledTableCell>{row.food_type}</StyledTableCell>
                        <StyledTableCell>{row.food_quantity}</StyledTableCell>
                        <StyledTableCell>{row.last_review}</StyledTableCell>
                        <StyledTableCell>{row.details === null ? '-' : row.details}</StyledTableCell>
                        <StyledTableCell>{row.animalImages ? row.animalImages.map(el => el.ImageFileName) : "-"}</StyledTableCell>
                        <StyledTableCell>
                            <ButtonsRowAndModal animalId={row.id}
                                        imageId={row.animalImages.length ? row.animalImages.map(el => el.id) : null}
                                        deleteAnimal={deleteAnimal}
                                        showImage={showImage}/>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </TableBody>
    )
}

const ButtonsRowAndModal = ({deleteAnimal, animalId, imageId}) => {

    const handleDeleteAnimal = () => {
        deleteAnimal(animalId)
    }

    return (
        <div style={{ display: 'inline-flex', gap: '8px', textAlign: 'right' }}>
            <Button style={{ textTransform: 'none', backgroundColor: "#e09900" }}  disableElevation variant="contained">Modify</Button>
            <Button style={{ textTransform: 'none', backgroundColor: "#cb1c4e" }}  disableElevation variant="contained" onClick={handleDeleteAnimal} >Delete</Button>
            <AnimalImageModal imageId={imageId} animalId={animalId}/>
        </div>
    );
}

const StyledTableCell = styled(TableCell)({
    textAlign: 'right'
});


