import React, {useEffect, useRef, useState} from 'react';
import s from "./HeroImage.module.css";
import image from "../ui/splash/leaves/vecteezy_ai-genere-bengale-tigre-majestueux-et-feroce-cache-dans_39600637.jpg";
import HeroNavigation from "../HeroNavigation/HeroNavigation";
import image1 from '../ui/splash/leaves/vecteezy_ai-genere-une-lisse-et-puissant-noir-panthere-rode-par-le_35784039.jpg'
import image2 from '../ui/splash/leaves/vecteezy_ai-generated-detailed-portrait-of-a-magnificent-lion_41409956.jpg'
import {useMediaQuery} from "@mui/material";

const HeroImage = () => {
    const [mousePos, setMousePos] = useState({})
    const [activeTab, setActiveTab] = useState('info');
    const [backgroundSrc, setBackgroundSrc] = useState(image)

    const [fullScreenNav, setFullScreenNav] = useState(true)


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



    useEffect(() => {
        switch (activeTab) {
            case 'info':
                setBackgroundSrc(image)
                break;
            case 'animals':
                setBackgroundSrc(image1)
            default:
                break;
        }
    }, [activeTab])

    const [showNavbar, setShowNavbar] = useState(false)

    const handleOnClick = () => {
        setShowNavbar(!showNavbar)
    }

    const min1000 = useMediaQuery('(min-width:1000px)');
    const min500 = useMediaQuery('(min-width:500px)');





    return (
        <section className={s.layers} style={{backdropFilter: "saturate(180%)"}}>

            <div className={`${s.navbar} ${showNavbar ? 'open' : ''}`} style={{transform: showNavbar ? 'translateX(100%)' : 'translateX(-50%)', width: min500 ? '50%' : '100%', left: min500 ? '-50%' : '-100%'}}>
                <HeroNavigation handleCloseNavbar={handleOnClick} activeTab={activeTab} setActiveTab={setActiveTab} setFullScreenNav={setFullScreenNav} fullScreenNav={fullScreenNav}/>
            </div>
            <div className={`${s.layers__container} ${s.parallax} ${s.firstAppearing}`}
                 style={{transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,}}>
                <div className={`${s.layers__item} ${s.layer_background} ${activeTab === 'info' ? s.visible : s.hidden} `} style={{backgroundImage: `url(${min500 ? image : image1})`, transform: showNavbar && !min1000 ? 'translateX(0%)' : 'translateX(0%)', transition: 'transform .6s ease'}}></div>
                <div className={`${s.layers__item} ${s.layer_background} ${activeTab === 'animals' ? s.visible : s.hidden}`} style={{backgroundImage: `url(${image1})`, transform: showNavbar && !min1000 ? 'translateX(0%)' : 'translateX(0%)', transition: 'transform .6s ease'}}></div>
                <div className={`${s.layers__item} ${s.layer_background} ${activeTab === 'contact' ? s.visible : s.hidden}`} style={{backgroundImage: `url(${min500 ? image2 : image1})`, transform: showNavbar && !min1000 ? 'translateX(0%)' : 'translateX(0%)', transition: 'transform .6s ease', backdropFilter: 'b'}}></div>

                <div className={`${s.layers__item} ${s.layer_main}`} style={{opacity : showNavbar ? 0 : 1, transition: 'all .6s ease'}}>
                    <h1 className={`${s.main_content}`} style={showNavbar ? {transform: min1000 ? 'translateX(100%)' : min500 ? 'translateX(185%)' : 'translateX(110%)', display: 'block'} : {transform: 'translateX(0%)'}} >
                        Arcadia
                    </h1>
                    <div className={s.description} style={showNavbar ? {transform: min500 ? 'translateX(155%)' : 'translateX(60%)'} : {transform: 'translateX(-50%)'}}>Zoo naturel.</div>
                    <div className={s.button} style={{opacity : showNavbar ? 0 : 1, fontFamily: 'Futura, sans-serif'}} onClick={handleOnClick}>Commencer l'aventure</div>
                </div>
            </div>
        </section>

    );
};

export default HeroImage;