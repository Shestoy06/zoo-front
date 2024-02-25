import Box from "@mui/material/Box";
import s from "../../../components/Client/Home/Home.module.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, {useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import AnimalService from "../../../services/animal.service";

const AnimalImageModal = ({imageId, animalId}) => {

    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleShowImage = () => {
        showImage(animalId, imageId)
    }

    const showImage = (animalId, imageId) => {
        AnimalService.getAnimalImage(animalId, imageId).then(
            imageUrl => {
                setImageData(imageUrl);
                handleOpen()
            }
        )
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div>
            {imageId && <Button style={{ textTransform: 'none', backgroundColor: "#339d15" }}  disableElevation variant="contained" onClick={handleShowImage}>Show image</Button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {imageData && <img src={imageData} style={{width:400}} alt="Your Image" />}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>

    )
}

export default AnimalImageModal