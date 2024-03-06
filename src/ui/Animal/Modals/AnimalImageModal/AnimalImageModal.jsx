import React, {useState} from "react";
import {Button} from "@mui/material";
import AnimalService from "../../../../services/animal.service";
import CustomModal from "../../../Modal/CustomModal";

const AnimalImageModal = ({imageId, animalId}) => {

    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const showImage = () => {
        console.log(imageData)

        AnimalService.getAnimalImage(animalId).then(images => {
            //setImageData(prevState => [...prevState, ...updatedImages]);
            setImageData(images)
            handleOpen()
        });
    }

    return (
        <div>
            {imageId && <Button
                style={{ textTransform: 'none', backgroundColor: "#339d15" }}
                disableElevation
                variant="contained"
                onClick={showImage}>Show image</Button>}
            <CustomModal open={open} handleClose={handleClose} title={'Animal image'} style={{maxHeight: 300}}>
                {imageData.length && imageData.map(image => (
                    <img src={`data:image/jpeg;base64,${image}`} style={{width: 400}} alt={"Animal"}/>))}
            </CustomModal>
        </div>

    )
}

export default AnimalImageModal