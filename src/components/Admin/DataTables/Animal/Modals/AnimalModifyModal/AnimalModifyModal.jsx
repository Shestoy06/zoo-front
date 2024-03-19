import CustomModal from '../../../../ui/Modal/CustomModal'
import React, {useState} from "react";
import AnimalModifyForm from "./AnimalModifyForm";
import TableModifyButton from "../../../../ui/Buttons/TableModifyButton/TableModifyButton";
const AnimalModifyModal = ({title, animal}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <TableModifyButton onClick={handleOpen}/>
            <CustomModal open={open} handleClose={handleClose} title={title} width={400}>
                <div>Id: {animal.id}</div>
                <AnimalModifyForm animal={animal} handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default AnimalModifyModal;