import React, {useEffect, useState} from 'react';
import s from './Slider.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import {CircularProgress} from "@mui/joy";

const Slider = ({images, animalId, setImageFile, deleteImage}) => {

    const [currentIndex, setCurrentIndex] = useState(1)
    const[isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(false)
    }, [images]);


    const increment = () => {
        if (currentIndex === images.length) {
            setCurrentIndex(1)
        } else {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const decrement = () => {
        if (currentIndex === 1) {
            // not change
        }
        else if (currentIndex === 0) {
            setCurrentIndex(1)
        }
        else {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const fileArray = Array.from(fileList);
        setImageFile({fileArray: fileArray, id: animalId});
        setIsLoading(true)
    }

    if(isLoading || images[0] === null) {
        return (
        <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <CircularProgress/>
        </div>)
    }

    return (
        <div>

            {images.length ?
                <div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <input className={s.fileInput} style={{marginBottom: 20}} type="file" name="photo" multiple onChange={handleFileChange}/>
                        <div className={s.imageContainer}>
                            <DeleteIcon className={s.buttonDelete} onClick={() => {
                                decrement()
                                deleteImage({id: animalId, imageId: images[currentIndex - 1]['id']})
                            }}/>
                            <img src={images[currentIndex - 1]['file']}
                                 style={{
                                     height: 'auto',
                                     maxWidth: '100%',
                                     width: '100%',
                                     maxHeight: 300,
                                     userSelect: "none"
                                 }}
                                 alt={"Image"}/>
                        </div>
                        <div className={s.buttonsContainer}>
                            <div onClick={decrement} className={s.button}><ArrowBackIosIcon/></div>
                            <div style={{
                                width: 115,
                                display: "flex",
                                alignItems: "center",
                                justifyItems: "center",
                                textAlign: "center",
                                userSelect: "none"
                            }}>{currentIndex} of {images.length}</div>

                            <div onClick={increment} className={s.button}><ArrowForwardIosIcon/></div>
                        </div>
                    </div>
                </div> :
                <div style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                    Time to add some images! <input className={s.fileInput} type="file" name="photo" multiple onChange={handleFileChange}/>
                </div>
            }
        </div>
    );
};

export default Slider;