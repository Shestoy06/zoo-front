import React, {useState} from 'react';
import s from './Slider.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';

const Slider = ({images, animalId, setImageFile, deleteImage}) => {

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
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <input className={s.fileInput} type="file" name="photo" multiple onChange={handleFileChange}/>
            {images.length ?
                <div className={s.imageContainer}>
                    <DeleteIcon className={s.buttonDelete} onClick={() => {
                        decrement()
                        deleteImage({id: animalId, imageId: images[currentIndex - 1]['id']})
                    }}/>
                    {images.length ?
                        images[currentIndex - 1] ?
                            <img src={`data:image/jpeg;base64,${images[currentIndex - 1]['file']}`}
                                 style={{
                                     height: 'auto',
                                     maxWidth: '100%',
                                     width: '100%',
                                     maxHeight: 300,
                                     userSelect: "none"
                                 }}
                                 alt={"Image"}/> : "wait"

                        : <div>No images</div>}

                </div> : <div></div>}
            {images.length ?
                <div className={s.buttonsContainer}>
                    <div onClick={decrement} className={s.button}><ArrowBackIosIcon/></div>
                    <div style={{
                        width: 115,
                        display: "flex",
                        alignItems: "center", justifyItems: "center", textAlign: "center", userSelect: "none"
                    }}>{currentIndex} of {images.length}</div>

                    <div onClick={increment} className={s.button}><ArrowForwardIosIcon/></div>
                </div> : <div></div>
            }
        </div>
    );
};

export default Slider;