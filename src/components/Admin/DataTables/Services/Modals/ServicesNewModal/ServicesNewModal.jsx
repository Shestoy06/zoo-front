import React, {useState} from 'react';
import s from "../../../Animal/Modals/AnimalNewModal/AnimalNewModal.module.css";
import CustomModal from "../../../../ui/Modal/CustomModal";
import TableNewButton from "../../../../ui/Buttons/TableNewButton/TableNewButton";
import ServicesNewForm from "./ServicesNewForm";

const ServicesNewModal = ({title}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className={s.container}>
            <TableNewButton onClick={handleOpen}/>
            <CustomModal open={open} handleClose={handleClose} title={title} width={400}>
                <ServicesNewForm handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default ServicesNewModal;