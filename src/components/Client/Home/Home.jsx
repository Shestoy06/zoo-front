import axios, {Axios} from "axios";
import {useEffect, useState} from "react";
import s from './Home.module.css'

const Home = () => {

    const [imageData, setImageData] = useState('')
    useEffect(() => {
        getImage()
    }, []);

    const getImage = () => {
        axios.get('http://127.0.0.1:8000/api/animal/1/image', {
            responseType: 'arraybuffer',
        }).then(
            res => {
                console.log(res)
                const imageUrl = URL.createObjectURL(
                    new Blob([res.data], { type: 'image/jpeg' })
                );
                setImageData(imageUrl);
            }
        )
    }

    return (
        <div>{imageData && <img src={imageData} className={s.image} alt="Your Image" />}</div>
    )
}

export default Home