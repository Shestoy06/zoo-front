import CustomModal from '../../../Modal/CustomModal'
import React, {useState} from "react";
import {Button} from "@mui/material";
import AnimalModifyForm from "./AnimalModifyForm";
const AnimalModifyModal = ({title, animal}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                style={{ textTransform: 'none', backgroundColor: "#e09900" }}
                disableElevation
                onClick={handleOpen}
                variant="contained">Modify</Button>
            <CustomModal open={open} handleClose={handleClose} title={title} width={300}>
                <div>Id: {animal.id}</div>
                <AnimalModifyForm animal={animal} handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default AnimalModifyModal;