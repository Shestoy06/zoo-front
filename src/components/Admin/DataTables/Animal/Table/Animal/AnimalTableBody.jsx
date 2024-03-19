import {Button, styled, TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import StyledTableCell from "../../../../ui/Table/StyledTableCell";
import StyledTableRow from "../../../../ui/Table/StyledTableRow";
import AnimalModifyModal from "../../Modals/AnimalModifyModal/AnimalModifyModal";
import {format} from "date-fns";
import TableDeleteButton from "../../../../ui/Buttons/TableDeleteButton/TableDeleteButton";
import toast from "react-hot-toast";
import AnimalImageModal from "../../Modals/AnimalImageModal/AnimalImageModal";


export const AnimalTableBody = ({animal, deleteAnimal, showImage}) => {
    if (!animal.error) {

        const rows = []

        animal.forEach(a => {
            rows.push(({id: a.id, name: a.name, species: a.species,
                animalHabitat: a.animalHabitat ? a.animalHabitat.name : "-",
                vet_review: a.vet_review, food_type: a.food_type, food_quantity: a.food_quantity,
                last_review: format(new Date(a.last_review ), 'dd-MM-yyyy'),
                details: a.details === null ? '-' : a.details,
                animalImages: a.animalImages.length ? a.animalImages.length > 1 ? `${a.animalImages.length} images` : a.animalImages[0].ImageFileName : "-" }))
        })


        return (
            <TableBody>
                {
                    rows.map((row, index) => (
                        <StyledTableRow key={index} style={{padding: 50}}>
                            {Object.values(row).map(el =>  (<StyledTableCell>{el}</StyledTableCell>))}
                            <StyledTableCell>
                                <ButtonsRowAndModal
                                    animal={row}
                                    animalId={row.id}
                                    imageId={row.animalImages.length > 1 ? true : false}
                                    deleteAnimal={deleteAnimal}
                                    showImage={showImage}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                }
            </TableBody>)
    } else {
        return <div>No animals yet!</div>
    }

}

const ButtonsRowAndModal = ({deleteAnimal, animalId, imageId, animal}) => {

    const handleDeleteAnimal = () => {
        deleteAnimal(animalId)
        toast('Animal deleted', {
            icon: '🗑️',
        });
    }

    return (
        <div style={{ display: 'inline-flex', gap: '8px', textAlign: 'right' }}>
            <AnimalModifyModal title={'Modify animal'} animal={animal}/>
            <TableDeleteButton onClick={handleDeleteAnimal}/>
            <AnimalImageModal imageId={imageId} animalId={animalId}/>
        </div>
    );
}




