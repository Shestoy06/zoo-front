import React, {useState} from 'react';
import {CCarousel, CCarouselItem, CImage} from "@coreui/react";
import bg from "../splash/leaves/vecteezy_ai-generated-close-up-of-an-urban-jungle-scene-nature_35846086.jpg";
import image from "../splash/leaves/vecteezy_zoo-backgound-in-vector-generative-ai_30223219.jpg";
import image1 from "../splash/leaves/vecteezy_ai-generatif-magnifique-jungle-contexte-avec-frontiere_29330349.jpg";
import image2 from "../splash/leaves/vecteezy_ai-genere-une-lisse-et-puissant-noir-panthere-rode-par-le_35784039.jpg";
import '@coreui/coreui/dist/css/coreui.min.css'
//import '@coreui/coreui/scss/_carousel.scss'


const Carousel = ({images}) => {


    return (
        <CCarousel transition="crossfade">
            <CCarouselItem interval={1000} style={{backgroundImage: image}}>
                <CImage className="d-block w-100" style={{display: 'block', width: 'auto', height: 300, borderRadius: 10}} src={image} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem interval={1000}>
                <CImage className="d-block w-100" style={{display: 'block', width: 'auto', height: 300, borderRadius: 10}} src={image1} alt="slide 2" />
            </CCarouselItem>
            <CCarouselItem interval={1000}>
                <CImage className="d-block w-100" style={{display: 'block', width: 200, height: 300, borderRadius: 10}} src={image2} alt="slide 3" />
            </CCarouselItem>
        </CCarousel>
    );
};

export default Carousel;