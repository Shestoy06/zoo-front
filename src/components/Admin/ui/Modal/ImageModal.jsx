import React, {useState} from 'react';
import ImageIcon from "@mui/icons-material/Image";
import CustomModal from "./CustomModal";
import Slider from "../Slider/Slider";
import TableImageButton from "../Buttons/TableImageButton/TableImageButton";

const ImageModal = ({data, getImages, postImage, id, imageData, deleteImage}) => {


    const setImageFile = (files) => {
        const {fileArray, id} = files
        const promises = fileArray.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const url = event.target.result;
                    resolve({ fileName: file.name, file: url });
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises)
            .then(fileArray => {
                postImage({fileArray, id})
            })
            .catch(error => {
                console.error('Error reading file:', error);
            });

    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const showImage = () => {
        getImages(id)
        handleOpen()
    }

    return (
        <div>
            <TableImageButton onClick={showImage}/>
            <CustomModal open={open} handleClose={handleClose} title={'Animal image'} style={{maxHeight: 300}}>
                <Slider images={imageData} animalId={id} refetchImages={getImages} setImageFile={setImageFile} deleteImage={deleteImage}/>
            </CustomModal>
        </div>

    )
};

export default ImageModal;