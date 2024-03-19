import React, {useState} from 'react';
import s from './Slider.module.css'
import AnimalService from "../../../../services/animal.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';

const Slider = ({images, animalId, refetchImages, setImageFile}) => {
    const queryClient = useQueryClient()
    const {mutate: deleteAnimalImageMutation} = useMutation({
        mutationFn: () => AnimalService.deleteAnimalImage(animalId, images[currentIndex-1]['id']),
        mutationKey: ['animalDeleteImage'],
        onSuccess: () => {
            decrement()
            queryClient.invalidateQueries({queryKey: ['animalImages']})
            queryClient.invalidateQueries({queryKey: ['animals']})
            refetchImages()
        }
    })

    const [currentIndex, setCurrentIndex] = useState(1)

    const increment = () => {
        if (currentIndex === images.length) {
            setCurrentIndex(1)
        } else {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const decrement = () => {
        if (currentIndex === 1) {
            setCurrentIndex(images.length)
        } else {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList);
        setImageFile(fileArray);
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <input className={s.fileInput} type="file" name="photo" multiple onChange={handleFileChange}/>
            <div className={s.imageContainer}>
                <DeleteIcon className={s.buttonDelete} onClick={deleteAnimalImageMutation} />
                <img src={`data:image/jpeg;base64,${images[currentIndex-1]['file']}`}
                     style={{height: 'auto', maxWidth: '100%', width: '100%', maxHeight: 300, userSelect:"none"}} alt={"Animal"}/>
            </div>
            <div className={s.buttonsContainer}>
                <div onClick={decrement} className={s.button}><ArrowBackIosIcon/></div>
                <div style={{width: 115, display:"flex", alignItems: "center", justifyItems: "center", textAlign: "center", userSelect: "none"}}>{currentIndex} of {images.length}</div>

                <div onClick={increment} className={s.button}><ArrowForwardIosIcon/></div>
            </div>
        </div>
    );
};

export default Slider;