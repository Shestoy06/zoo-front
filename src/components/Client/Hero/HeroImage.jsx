import React, {useEffect, useRef, useState} from 'react';
import s from "./HeroImage.module.css";
import image from "../ui/splash/leaves/vecteezy_ai-genere-bengale-tigre-majestueux-et-feroce-cache-dans_39600637.jpg";
import HeroNavigation from "../HeroNavigation/HeroNavigation";

const HeroImage = () => {
    const [mousePos, setMousePos] = useState({})

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: (event.clientX - window.innerWidth/2) * .005, y: (event.clientY - window.innerHeight) * .005 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    const [showNavbar, setShowNavbar] = useState(false)

    const handleOnClick = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <section className={s.layers} style={{backdropFilter: "saturate(180%)"}}>

            <div className={`${s.navbar} ${showNavbar ? 'open' : ''}`} style={showNavbar ? {transform: 'translateX(100%)'} : {transform: 'translateX(-50%)'}}>
                <HeroNavigation handleCloseNavbar={handleOnClick}/>
            </div>
            <div className={`${s.layers__container} ${s.parallax}`}
                 style={{transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,}}>
                <div className={`${s.layers__item} ${s.layer_background}`}
                     style={{backgroundImage: `url(${image})`, filter: "saturate(180%)"}}></div>
                <div className={`${s.layers__item} ${s.layer_main}`}>
                    <div className={`${s.main_content}`} style={showNavbar ? {transform: 'translateX(100%)'} : {transform: 'translateX(0%)'}} >
                        <h1>Arcadia</h1>
                    </div>
                    <div className={s.description} style={showNavbar ? {transform: 'translateX(100%)'} : {transform: 'translateX(-50%)'}}>Zoo naturel.</div>
                    <a href="#" className={s.button} style={showNavbar ? {opacity: 0} : {opacity: 1}} onClick={handleOnClick}>Commencer l'aventure</a>
                </div>
            </div>
        </section>

    );
};

export default HeroImage;