import React, {useState} from 'react';
import s from "./HeroNavigation.module.css";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import image from '../ui/splash/leaves/vecteezy_ai-genere-une-lisse-et-puissant-noir-panthere-rode-par-le_35784039.jpg'
import image1 from '../ui/splash/leaves/vecteezy_ai-genere-jaguar-haute-qualite-image_38008768.jpg'
import '@coreui/coreui/dist/css/coreui.min.css'
import {CCarousel, CCarouselCaption, CCarouselItem, CImage} from "@coreui/react";

const HeroNavigation = ({handleCloseNavbar}) => {

    const [activeTab, setActiveTab] = useState('info');
    const [hideMenu, setHideMenu] = useState(false)

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', gap: 40, position: 'relative'}}>
            <div className={s.close_icon} onClick={() => handleCloseNavbar()}><CloseIcon/></div>
            <div className={s.close_icon} onClick={() => setHideMenu(!hideMenu)} style={{marginTop: 40}}><MenuIcon/></div>
            <div className={`${s.navigation} ${hideMenu ? s.hidden__navigation : s.visible__navigation}`}>
                <div className={s.navigation__item} style={activeTab === 'info' ? {textDecoration: 'underline'} : {textDecoration: 'none'}} onClick={() => setActiveTab('info')}>Info</div>
                <div className={s.navigation__item} style={activeTab === 'animals' ? {textDecoration: 'underline'} : {textDecoration: 'none'}} onClick={() => setActiveTab('animals')}>Animaux</div>
                <div className={s.navigation__item} style={activeTab === 'habitats' ? {textDecoration: 'underline'} : {textDecoration: 'none'}} onClick={() => setActiveTab('habitats')}>Habitats</div>
                <div className={s.navigation__item}>Avis</div>
            </div>
            <div style={{position: 'relative', width: '100%', overflow: 'scroll'}}>
                <div className={s.navigation__content}>
                    <div className={`${s.content__item} ${activeTab === 'info' ? s.visible : s.hidden} ${hideMenu ? s.hidden__navigation_content : s.visible__navigation_content}`}>
                        <div className={s.info__content}>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{marginBottom: 30, fontSize: 32, textAlign: 'center', fontWeight: 'bold'}}>
                                Bienvenue chez Arcadia
                            </div>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{maxWidth: 700, marginBottom: 30}}>
                                Arcadia est une zoo près de la forêt de Brocéliande en Bretagne. Depuis 1960 elle offre
                                l'occasion unique d'être
                                le vrai spectateur de la nature, mais serez-vous assez courageux?
                            </div>
                            <div style={{marginBottom: 30, alignSelf: 'flex-start'}}>
                                Nos animaux:
                            </div>
                            <CCarousel controls indicators transition="crossfade" style={{width: '100%', paddingLeft: 80, paddingRight: 80, marginBottom: 30}}>
                                <CCarouselItem interval={1000}>
                                    <CImage style={{width: '100%', display: 'block', borderRadius: 10}} src={image} alt="slide 1" />
                                    <CCarouselCaption className="d-none d-md-block">
                                        <span>Panthéra</span>
                                    </CCarouselCaption>
                                </CCarouselItem>
                                <CCarouselItem  interval={1000}>
                                    <CImage style={{width: '100%', borderRadius: 10}} src={image1} alt="slide 2" />
                                    <CCarouselCaption className="d-none d-md-block">
                                        <span>Léopard</span>
                                    </CCarouselCaption>
                                </CCarouselItem>
                                <CCarouselItem  interval={1000}>
                                    <CImage style={{width: '100%', borderRadius: 10}} src={image} alt="slide 3" />
                                </CCarouselItem>
                            </CCarousel>
                            <div style={{marginBottom: 30, alignSelf: 'flex-start'}}>
                                Nos avis:
                            </div>
                            <CCarousel transition="crossfade" style={{width: '100%', marginBottom: 30}} pause={false}>
                                <CCarouselItem interval={1000}>
                                    <div style={{backgroundColor: 'rgba(0,0,0)', opacity: 1, borderRadius: 20, padding: 20}}>
                                        Experience incroyable
                                    </div>
                                </CCarouselItem>
                                <CCarouselItem interval={1000}>
                                    <div style={{backgroundColor: 'rgba(0,0,0)', opacity: 1, borderRadius: 20, padding: 20}}>
                                        Hello
                                    </div>
                                </CCarouselItem>
                                <CCarouselItem interval={1000}>
                                    <div style={{backgroundColor: 'rgba(0,0,0)', opacity: 1, borderRadius: 20, padding: 20}}>
                                        Hello
                                    </div>
                                </CCarouselItem>
                            </CCarousel>
                        </div>
                    </div>
                    <div className={activeTab === 'animals' ? s.visible : s.hidden}>
                        This is animals
                    </div>
                    <div className={activeTab === 'habitats' ? s.visible : s.hidden}>
                        This is habitats
                    </div>
                </div>
            </div>

        </div>

    );
};


export default HeroNavigation;