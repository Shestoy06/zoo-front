import React, {useEffect, useRef, useState} from 'react';
import s from './Home.module.css'
import HeroImage from './Hero/HeroImage'
import image1 from './ui/splash/leaves/vecteezy_ai-generated-close-up-of-an-urban-jungle-scene-nature_35846086.jpg'
import Header from "./ui/header/Header";


const Home = () => {

    const [mousePos, setMousePos] = useState({})
    const [shouldRemove, setShouldRemove] = useState(false)

    useEffect(() => {
        const delayInMilliseconds = 10000; // 5 seconds
        const timerId = setTimeout(() => {
            // After the delay, set the shouldRemove state to true
            setShouldRemove(true);
        }, delayInMilliseconds);
        return () => clearTimeout(timerId);
    }, []);

    const videoRef= useRef();
    const setPlayBack = () => {
        videoRef.current.playbackRate = 1.5;
    };

    document.addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM fully loaded and parsed");
    });





    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: (event.clientX - window.innerWidth/2) * -.105, y: (event.clientY - window.innerHeight) * -.101 });
        };

        window.addEventListener('mousemove', handleMouseMove);


        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);


    return (
        <div className={s.container}>
            <div style={{width: '100vw', height: '100vh', position: 'relative', backgroundColor: "#000"}}>
                {
                    !shouldRemove && (
                        <div>
                            <div className={s.title}>
                                Adventure begins here...
                            </div>
                            <img src={image1} className={s.video} alt=""/>
                        </div>
                    )
                }
                <HeroImage/>
            </div>
        </div>


    );
};

export default Home;