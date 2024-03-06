import CustomModal from '../../../Modal/CustomModal'
import React, {useState} from "react";
import {Button} from "@mui/material";
import AnimalNewForm from "./AnimalNewForm";
const AnimalNewModal = ({title}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                style={{ textTransform: 'none', backgroundColor: "#0fcb3b" }}
                disableElevation
                onClick={handleOpen}
                variant="contained">New animal</Button>
            <CustomModal open={open} handleClose={handleClose} title={title} width={600}>
                <AnimalNewForm handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default AnimalNewModal;