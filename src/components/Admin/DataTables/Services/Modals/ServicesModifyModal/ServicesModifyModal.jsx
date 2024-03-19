import React, {useState} from 'react';
import TableModifyButton from "../../../../ui/Buttons/TableModifyButton/TableModifyButton";
import CustomModal from "../../../../ui/Modal/CustomModal";
import ServicesModifyForm from "./ServicesModifyForm";

const ServicesModifyModal = ({service, serviceId, title}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <TableModifyButton onClick={handleOpen}/>
            <CustomModal open={open} handleClose={handleClose} title={title} width={400}>
                <div>Id: {service.id}</div>
                <ServicesModifyForm service={service} handleClose={handleClose}/>
            </CustomModal>
        </div>

    );
};

export default ServicesModifyModal;