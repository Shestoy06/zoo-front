import CustomModal from '../../../../ui/Modal/CustomModal'
import React, {useState} from "react";
import {Button} from "@mui/material";
import AnimalNewForm from "./AnimalNewForm";
import AddIcon from '@mui/icons-material/Add';
import s from './AnimalNewModal.module.css'

const AnimalNewModal = ({title}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className={s.container}>
            <Button
                className={s.button}
                disableElevation
                onClick={handleOpen}
                variant="contained"><AddIcon/></Button>
            <CustomModal open={open} handleClose={handleClose} title={title} width={400}>
                <AnimalNewForm handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default AnimalNewModal;