import React, {useState} from 'react';
import TableModifyButton from "../../../../ui/Buttons/TableModifyButton/TableModifyButton";
import CustomModal from "../../../../ui/Modal/CustomModal";
import RateModifyForm from "./RateModifyForm";

const RateModifyModal = ({rate, title}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <TableModifyButton onClick={handleOpen}/>
            <CustomModal open={open} handleClose={handleClose} title={title} width={400}>
                <RateModifyForm rate={rate} handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default RateModifyModal;