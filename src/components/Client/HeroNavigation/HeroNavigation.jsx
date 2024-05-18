import React, {useEffect, useRef, useState} from 'react';
import s from "./HeroNavigation.module.css";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ServicesService from "../../../services/services.service";
import RatesService from "../../../services/rates.service";
import AnimalService from "../../../services/animal.service";
import HabitatService from "../../../services/habitat.service";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';
import {useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";

const HeroNavigation = ({handleCloseNavbar, activeTab, setActiveTab, setFullScreenNav, fullScreenNav}) => {

    const ALL_ANIMALS = 'All'

    const min1000 = useMediaQuery('(min-width:1000px)');

    const [hideMenu, setHideMenu] = useState(!min1000)
    const [habitatSelected, setSelectedHabitat] = useState(ALL_ANIMALS)
    const [habitatsVisible, setHabitatsVisible] = useState(false) // false if show animals

    const [reviewText, setReviewText] = useState("")
    const [reviewPseudo, setReviewPseudo] = useState("")



    const {data: services, isLoading: isLoadingServices, error: errorServices} = useQuery({
        queryFn: () => ServicesService.get(),
        queryKey: ['services']
    })
    const {data: rates, isLoading: isLoadingRates, error: errorRates} = useQuery({
        queryFn: () => RatesService.get(),
        queryKey: ['rates']
    })
    const {data: images, isLoading: isLoadingImages, error: errorImages, refetch: refetchAnimals} = useQuery({
        queryFn: () => AnimalService.getAnimalImages(),
        queryKey: ['images'],
    })
    const {data: habitats, isLoading: isLoadingHabitats, error: errorHabitats, refetch: refetchHabitats} = useQuery({
        queryFn: () => HabitatService.getWithPhotos(),
        queryKey: ['habitats'],
    })

    const {mutate: putMutation} = useMutation({
        mutationFn: (rate) => RatesService.post(rate),
        mutationKey: ['putRate'],
        onSuccess: () => {
            setReviewText("")
            setReviewPseudo("")
            toast.success('Votre avis a été bien envoyé!');
        },
    })
    const {mutate: incrementViews} = useMutation({
        mutationFn: (body) => AnimalService.incrementViews(body),
        mutationKey: ['incrementViews'],
    })

    const [expandedCardId, setExpandedCardId] = useState(null)

    // Responsive

    const min1500 = useMediaQuery('(min-width:1500px)');
    const min1280 = useMediaQuery('(min-width:1280px)');
    const min640 = useMediaQuery('(min-width:640px)');
    const min500 = useMediaQuery('(min-width:500px)');
    const min410 = useMediaQuery('(min-width:410px)');

    const fontSizeNormalTextFutura = min1000 ? 14 : 10

    const showHabitats = () => {

        if (isLoadingHabitats) return <div>Chargement...</div>
        if (errorHabitats) return <div>Une erreur est survenue</div>

        let widthForCard = '100%'

        if (min1500) {
            widthForCard = '40%'
        }
        if (!min1500 && !hideMenu) {
            widthForCard = '40%'
        }
        if (!min1500 && hideMenu) {
            widthForCard = '25%'
        }
        if (!min1280 && hideMenu) {
            widthForCard = '40%'
        }
        if (!min1280 && !hideMenu) {
            widthForCard = '100% !important'
        }
        if (!min640) {
            widthForCard = '37%'
        }
        if (!min500) {
            widthForCard = '90%'
        }
        if (!min500 && fullScreenNav) {
            widthForCard = '37%'
        }

        return (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 20, fontFamily: 'Futura, sans-serif'}}>
                {habitats.map((image, index) =>
                        <div
                            className={`${expandedCardId === index && s.expandedCard} ${s.animals__image}`}
                            style={{transition: 'all .6s ease', width: widthForCard, maxWidth: 300}} onClick={() => {
                            setSelectedHabitat(image.habitat)
                            setHabitatsVisible(false)
                        }}>
                            <div style={{position: 'relative'}}>
                                <div style={{
                                    height: expandedCardId === index ? '100%' : min1000 ? 200 : 120,
                                    overflow: "hidden",
                                    borderRadius: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all .6s ease'
                                }}>
                                    <img
                                        src={`data:image/jpeg;base64,${image['files'][0]}`}
                                        style={{
                                            height: '100%',
                                            transition: 'height .6s ease',
                                        }}
                                        alt={"Image"}/>
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    left: 10,
                                    bottom: 10,
                                    fontSize: min1000 ? 18 : 14
                                }}>{image.habitat}</div>
                            </div>
                            <div style={{padding: 10, fontSize: 16}}>
                                <div style={{marginBottom: 5, fontSize: min1000 ? 18 : 14}}>Description:</div>
                                <div style={{marginBottom: 10, fontSize: min1000 ? 18 : 12}}>{image.description}</div>
                                <div style={{fontSize: min1000 ? 18 : 14}}>Les animaux:</div>
                                <ul  style={{margin: 0, paddingLeft: 15, paddingTop: 5, fontSize: min1000 ? 18 : 12}}>
                                    <li>{image.animals[0] ? image.animals[0] : 'Pas encore d\'animaux'}</li>
                                    {image.animals[1] && <li>{image.animals[1]}</li>}
                                    {image.animals[2] && <li>{image.animals[2]}...</li>}

                                </ul>
                            </div>
                        </div>
                )}
            </div>
        )
    }

    const displayForCross = () => {
        if(min500) {
            return 'block'
        } else if (!min500 && hideMenu) {
            return 'block'
        } else {
            return 'none'
        }
    }

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', gap: 10, position: 'relative', fontFamily: 'Futura, sans-serif'}}>
            <div style={{width: '100%', height: 50, position: 'absolute', top: 0, left: 0}}  className={s.icons_container}>
                <div className={`${s.close_icon} ${s.close_icon_cross}`} style={{display: displayForCross()}} onClick={() => {
                    handleCloseNavbar()
                }}><CloseIcon/></div>
                <div className={s.close_icon} onClick={() => {
                    setHideMenu(!hideMenu)
                }} style={{marginTop: 40}}><MenuIcon/></div>
            </div>
            <div className={`${s.navigation} ${hideMenu ? s.hidden__navigation : s.visible__navigation}`}
                 style={{fontFamily: 'Futura, sans-serif'}} onClick={() => {
                     if(!min1000) {
                        if (!hideMenu) setHideMenu(!hideMenu)
                     }
            }}>
                <div className={s.navigation__item}
                     style={activeTab === 'info' ? {textDecoration: min1000 ? 'underline' : 'none'} : {textDecoration: 'none'}}
                     onClick={() => setActiveTab('info')}><span
                    style={{fontFamily: 'Futura, sans-serif'}}>Accueil</span>
                </div>
                <div className={s.navigation__item}
                     style={activeTab === 'animals' ? {textDecoration: min1000 ? 'underline' : 'none'} : {textDecoration: 'none'}}
                     onClick={() => setActiveTab('animals')}><span
                    style={{fontFamily: 'Futura, sans-serif'}}>Animaux</span>
                </div>
                <div className={s.navigation__item}
                     style={activeTab === 'contact' ? {textDecoration: min1000 ? 'underline' : 'none'} : {textDecoration: 'none'}}
                     onClick={() => setActiveTab('contact')}><span
                    style={{fontFamily: 'Futura, sans-serif'}}>Contact</span>
                </div>
                <NavLink to={'/zoo-front/login'} className={s.navigation__item}
                   style={activeTab === 'connection' ? {
                       textDecoration: min1000 ? 'underline' : 'none',
                       bottom: min1280 ? 40 : 20,
                       left: min1280 ? 40 : min1000 ? 20 : 40,
                       fontSize: fontSizeNormalTextFutura
                   } : {
                       textDecoration: 'none',
                       backgroundColor: 'black !important',
                       position: min1000 ? 'absolute' : 'unset',
                       bottom: 60,
                       left: 40,
                       fontSize: fontSizeNormalTextFutura
                   }}
                   onClick={() => setActiveTab('connection')}><span
                    style={{fontFamily: 'Futura, sans-serif'}}>Connexion</span>
                </NavLink>
                <div className={s.navigation__item}
                     style={{textDecoration: 'none'}}
                     onClick={() => setActiveTab('contact')}>
                    <span style={{fontFamily: 'Futura, sans-serif', fontSize: 10, justifySelf: "flex-end", position: 'absolute', bottom: min1000 ? 20 : 40, left: min1000 ? 40 : 20, textTransform: 'none'}}>Made with ❤️ by Andrei Silin</span>
                </div>
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <div className={s.navigation__content}>
                    <div
                        className={`${s.content__item} ${activeTab === 'info' ? s.visible : s.hidden} ${hideMenu && activeTab === 'info' ? s.hidden__navigation_content : s.visible__navigation_content}`}
                        style={{height: '100%'}}>
                        <div className={s.info__content} style={{overflow: 'scroll'}}>
                            <div className={`${s.info__item} ${s.title} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{
                                     marginBottom: 30,
                                     fontSize: 64,
                                     wordSpacing: '100vw',
                                     textTransform: 'uppercase',
                                     alignSelf: 'flex-start',
                                     fontFamily: 'Futura, sans-serif'
                                 }}>
                                Bienvenue chez Arcadia
                            </div>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{marginBottom: 50, fontFamily: 'Futura, sans-serif', alignSelf: 'flex-start'}}>
                                Arcadia est une zoo près de la forêt de Brocéliande en Bretagne. Depuis 1960 elle offre
                                l'occasion unique d'être
                                le vrai spectateur de la nature, mais serez-vous assez courageux?
                            </div>

                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{alignSelf: 'flex-start', marginBottom: 30}}>

                                <a href="#" className={`${s.button}`} style={{fontFamily: 'Futura, sans-serif'}} onClick={() => setActiveTab('animals')}>Voir tous les animaux</a>
                            </div>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{alignSelf: 'flex-start', width: '100%'}}>
                                <Accordion style={{backgroundColor: 'transparent', boxShadow: 'none', color: 'white'}}
                                           className={`${s.accordion} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                           sx={{
                                               '& .MuiAccordionSummary-expandIconWrapper': {color: 'white'},
                                               '& .MuiAccordionSummary-root': {gap: 2, paddingLeft: 0},
                                               '& .MuiAccordionSummary-content': {justifyContent: min500 ? 'end' : 'unset'}
                                           }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"

                                    >
                                        <span style={{fontFamily: 'Futura, sans-serif'}}>Services</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {isLoadingServices ? <div>Chargement...</div>
                                            : errorServices ? <div>Une erreur est survenue</div>
                                                : services.map(service => <div style={{marginBottom: 20}}>
                                                    <div style={{fontFamily: 'Futura, sans-serif', marginBottom: 5}}>{service.name}</div>
                                                    <div style={{fontSize: min1000 ? 18 : 14, fontFamily: 'Futura, sans-serif'}}>{service.description}</div>
                                                </div>)}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{alignSelf: 'flex-start', width: '100%'}}>
                                <Accordion style={{backgroundColor: 'transparent', boxShadow: 'none', color: 'white'}}
                                           className={`${s.accordion} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                           sx={{
                                               '& .MuiAccordionSummary-expandIconWrapper': {color: 'white'},
                                               '& .MuiAccordionSummary-root': {gap: 2, paddingLeft: 0},
                                               '& .MuiAccordionSummary-content': {justifyContent: min500 ? 'end' : 'start'}
                                           }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <span style={{fontFamily: 'Futura, sans-serif'}}>Habitats</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    {isLoadingHabitats ? <div>Chargement...</div>
                                            : errorHabitats ? <div>Une erreur est survenue</div>
                                                : habitats.map(habitat => <div style={{marginBottom: 20}}>
                                                    <div style={{fontFamily: 'Futura, sans-serif', marginBottom: 5}}>{habitat.habitat}</div>
                                                    <div style={{fontSize: min1000 ? 18 : 14, fontFamily: 'Futura, sans-serif'}}>{habitat.description}</div>
                                                </div>)}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <div className={`${s.info__item} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                 style={{alignSelf: 'flex-start', width: '100%'}}>
                                <Accordion style={{backgroundColor: 'transparent', boxShadow: 'none', color: 'white'}}
                                           className={`${s.accordion} ${activeTab === 'info' ? s.visible : s.hidden}`}
                                           sx={{
                                               '& .MuiAccordionSummary-expandIconWrapper': {color: 'white'},
                                               '& .MuiAccordionSummary-root': {gap: 2, paddingLeft: 0},
                                               '& .MuiAccordionSummary-content': {justifyContent: min500 ? 'end' : 'start'}
                                           }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <span style={{fontFamily: 'Futura, sans-serif'}}>Avis</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <div style={{marginBottom: 20, fontFamily: 'Futura, sans-serif'}}>Laisser votre avis</div>
                                        <div style={{fontSize: min1000 ? 18 : 14, marginBottom: 10, fontFamily: 'Futura, sans-serif'}}>Votre nom:</div>
                                        <div style={{marginBottom: 10}}>
                                            <input type="text" value={reviewPseudo}
                                                   className={s.reviewInput}
                                                   onChange={(e) => setReviewPseudo(e.target.value)}/>
                                        </div>
                                        <div style={{fontSize: min1000 ? 18 : 14, marginBottom: 10, fontFamily: 'Futura, sans-serif'}}>Votre message:</div>
                                        <div style={{marginBottom: 10}}>
                                            <textarea type="text" value={reviewText}
                                                      className={s.reviewInput}
                                                      onChange={(e) => setReviewText(e.target.value)}/>
                                        </div>

                                        <div className={`${s.button} ${habitatsVisible && s.buttonSelected}`}
                                             style={{marginBottom: 30, fontFamily: 'Futura, sans-serif'}}
                                             onClick={() => {
                                                 if (!reviewText || !reviewPseudo) {
                                                     toast.error("Impossible d'envoyer votre avis: \n les champs sont vides ou invalides")
                                                 } else {
                                                     putMutation({
                                                         pseudo: reviewPseudo,
                                                         message: reviewText
                                                     })
                                                 }
                                             }}><span style={{fontFamily: 'Futura, sans-serif'}}>Envoyer</span>
                                        </div>
                                        <div style={{marginBottom: 20, fontFamily: 'Futura, sans-serif'}}>Les dernièrs avis</div>
                                        {isLoadingRates ? <div>Chargement...</div>
                                            : errorRates ? <div>Une erreur est survenue</div>
                                                : rates.map(rate => {
                                                    if (rate.status === 'Accepted') {
                                                        return (<div style={{marginBottom: 20}}>
                                                            <div style={{marginBottom: 10, fontFamily: 'Futura, sans-serif'}}>{rate.pseudo}</div>
                                                            <div style={{fontSize: min1000 ? 18 : 12, fontFamily: 'Futura, sans-serif'}}>{rate.message}</div>
                                                        </div>)
                                                    }
                                                })}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${s.content__item} ${activeTab === 'animals' ? s.visible : s.hidden} ${hideMenu && activeTab === 'animals' ? s.hidden__navigation_content : s.visible__navigation_content}`}
                        style={{height: '100%', overflow: 'scroll'}}>
                        <div className={activeTab === 'animals' ? s.visible : s.hidden}>
                            <div className={s.animals__content}>
                                <div
                                    className={`${s.info__item} ${s.title} ${activeTab === 'animals' ? s.visible : s.hidden}`}
                                    style={{
                                        marginBottom: 30,
                                        fontSize: 64,
                                        textTransform: 'uppercase',
                                        alignSelf: 'flex-start'
                                    }}>
                                    <span style={{fontFamily: 'Futura, sans-serif'}}>Animaux</span>
                                </div>
                                <div className={`${s.info__item} ${activeTab === 'animals' ? s.visible : s.hidden}`}
                                     style={{marginBottom: 30, alignSelf: 'flex-start', fontFamily: 'Futura, sans-serif'}}>
                                    Les animaux se trouvent dans les conditions les plus proches de la nature. Le
                                    vétérinaire observe soigneusement les habitats et l'état de santé des animaux.
                                </div>
                                <div style={{marginBottom: 15, display: 'flex', gap: 10}}>
                                    <a href="#" className={`${s.button} ${habitatsVisible && s.buttonSelected}`}
                                       style={{fontFamily: 'Futura, sans-serif'}}
                                       onClick={() => {
                                           setHabitatsVisible(true)
                                       }}>Habitats</a>
                                    <a href="#"
                                       className={`${s.button} ${habitatSelected === ALL_ANIMALS && !habitatsVisible && s.buttonSelected}`}
                                       style={{fontFamily: 'Futura, sans-serif'}}
                                       onClick={() => {
                                           setHabitatsVisible(false)
                                           setSelectedHabitat(ALL_ANIMALS)
                                       }}>{min410 ? 'Tous les animaux' : 'Animaux'}</a>
                                </div>
                                <div style={{marginBottom: 30, display: 'flex', gap: 10}}>
                                    {!isLoadingHabitats && !errorHabitats && habitats.map(habitat => <a href="#"
                                                                                                        className={`${s.button} ${habitatSelected === habitat.habitat && !habitatsVisible && s.buttonSelected}`}
                                                                                                        style={{fontFamily: 'Futura, sans-serif'}}
                                                                                                        onClick={() => {
                                                                                                            setHabitatsVisible(false)
                                                                                                            setSelectedHabitat(habitat.habitat)
                                                                                                        }}>{habitat.habitat}</a>)}


                                </div>


                                {habitatsVisible ? showHabitats() : isLoadingImages ? <div>Chargement...</div> : errorImages ?
                                    <div>Erreur...</div> :
                                    <div className={s.animals__images} style={{fontFamily: 'Futura, sans-serif'}}>
                                        {images.map((image, index) => <ShowAnimals
                                                index={index} min1500={min1500}
                                                hideMenu={hideMenu} min1280={min1280} min1000={min1000} min640={min640} min500={min500} fullScreenNav={fullScreenNav} image={image}
                                                habitatSelected={habitatSelected} expandedCardId={expandedCardId} setExpandedCardId={setExpandedCardId} incrementViews={incrementViews}/>)}
                                    </div>
                                }

                            </div>
                        </div>
                    </div>

                    <div
                        className={`${s.content__item} ${activeTab === 'contact' ? s.visible : s.hidden} ${hideMenu && activeTab === 'contact' ? s.hidden__navigation_content : s.visible__navigation_content}`}
                        style={{height: '100%', overflow: 'scroll'}}>
                        <div className={activeTab === 'contact' ? s.visible : s.hidden}>
                            <div className={s.info__content}>
                                <div
                                    className={`${s.info__item} ${s.title} ${activeTab === 'contact' ? s.visible : s.hidden}`}
                                    style={{
                                        marginBottom: 30,
                                        fontSize: 64,
                                        wordSpacing: '100vw',
                                        textTransform: 'uppercase',
                                        alignSelf: 'flex-start',
                                        fontFamily: 'Futura, sans-serif'
                                    }}>
                                    Contact
                                </div>
                                <div className={`${s.info__item} ${activeTab === 'contact' ? s.visible : s.hidden}`}
                                     style={{marginBottom: 50, alignSelf: 'flex-start', fontFamily: 'Futura, sans-serif'}}>
                                    Contacter Arcadia pour demander les informations complémentaires.
                                </div>
                                <div style={{alignSelf: 'flex-start', width: '100%'}}>
                                    <ContactUs/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export const ContactUs = () => {
    const form = useRef();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const min1000 = useMediaQuery('(min-width:1000px)');


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_io461h5', 'template_iz7k9yp', form.current, {
                publicKey: 'tn4bJ6ilX_SEr2b0f',
            })
            .then(
                () => {
                    toast.success('Votre message a été bien envoyé!')
                    setName("")
                    setEmail("")
                    setMessage("")

                },
                (error) => {
                    toast.error('Une erruer est survenue, veuillez reesayer plus tard.')
                },
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <div style={{marginBottom: 5, fontSize: min1000 ? 18 : 14}}>
                <label style={{fontFamily: 'Futura, sans-serif'}}>Votre nom:</label>
            </div>
            <div style={{marginBottom: 20}}>
                <input type="text" value={name} required={true} onChange={(e) => setName(e.target.value)}
                       className={s.reviewInput} name="from_name"/>
            </div>
            <div style={{marginBottom: 5, fontSize: min1000 ? 18 : 14}}>
                <label style={{fontFamily: 'Futura, sans-serif'}}>Email:</label>
            </div>
            <div style={{marginBottom: 20}}>
                <input type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)}
                       className={s.reviewInput} name="email_to_answer"/>
            </div>
            <div style={{marginBottom: 5, fontSize: min1000 ? 18 : 14}}>
                <label style={{fontFamily: 'Futura, sans-serif'}}>Message:</label>
            </div>
            <div style={{marginBottom: 20}}>
                <textarea name="message" value={message} required={true} onChange={(e) => setMessage(e.target.value)}
                          className={s.reviewInput}/>
            </div>
            <input type="submit" value="Envoyer" className={s.button} style={{fontFamily: 'Futura, sans-serif'}}/>
        </form>
    );
};

const ShowAnimals = ({isLoadingImages, errorImages, min1500, hideMenu, min1280, min1000, min640, min500, fullScreenNav, image, habitatSelected, expandedCardId, setExpandedCardId, incrementViews, index}) => {

    const [imageNumber, setImageNumber] = useState(0)

    let widthForCard = '100%'

    if (min1500) {
        widthForCard = '25%'
    }
    if (!min1500 && !hideMenu) {
        widthForCard = '40%'
    }
    if (!min1500 && hideMenu) {
        widthForCard = '25%'
    }
    if (!min1280 && hideMenu) {
        widthForCard = '40%'
    }
    if (!min1280 && !hideMenu) {
        widthForCard = '100% !important'
    }
    if (!min640) {
        widthForCard = '37%'
    }
    if (!min500) {
        widthForCard = '90%'
    }
    if (!min500 && fullScreenNav) {
        widthForCard = '40%'
    }

    if (image.animalHabitat === habitatSelected || habitatSelected === 'All') {
                    return (<div
                        className={`${expandedCardId === index && s.expandedCard} ${s.animals__image}`}
                        style={{transition: 'all .6s ease', width: widthForCard}}
                        onClick={() => {
                            if (expandedCardId === index) {
                                setExpandedCardId(null)
                            } else {

                                incrementViews({animalId: image.animalIdMongo})
                                setExpandedCardId(index)

                            }

                        }}>
                        <div style={{position: 'relative'}}>
                            <div style={{
                                height: expandedCardId === index ? '100%' : min500 ? 120 : 100,
                                overflow: "hidden",
                                borderRadius: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Arrow position={'left'} setImageNumber={setImageNumber} setExpandedCardId={setExpandedCardId} index={index} images={image['files']} imageNumber={imageNumber} visible={expandedCardId === index}/>
                                <img
                                    src={`data:image/jpeg;base64,${image['files'][imageNumber]}`}
                                    style={{
                                        height: '100%',
                                        transition: 'height .6s ease',

                                    }}
                                    alt={"Image"}/>
                                <Arrow position={'right'} setImageNumber={setImageNumber} setExpandedCardId={setExpandedCardId} index={index} images={image['files']} imageNumber={imageNumber} visible={expandedCardId === index}/>
                            </div>

                            <div style={{
                                position: 'absolute',
                                left: 10,
                                bottom: 10,
                                fontSize: !min1000 && 14
                            }}>{image.animal}</div>
                        </div>
                        <div
                            className={expandedCardId === index ? s.animals__image_content : s.animals__image_content_hidden}>
                            <div>Race: {image.animalSpecies}</div>
                            <div>Etat de santé: {image.animalState}</div>
                            <div>Habitat: {image.animalHabitat}</div>
                        </div>
                    </div>)
    }
}

const Arrow = ({position, setExpandedCardId, setImageNumber, index, imageNumber, images, visible}) => {

    const increment = () => {
        if (imageNumber === images.length - 1) {
            setImageNumber(0)
        } else {
            setImageNumber(prevState => prevState + 1)
        }
    }

    const decrement = () => {
        if (imageNumber === 0) {
            setImageNumber(images.length - 1)
        }
        else {
            setImageNumber(prevState => prevState - 1)
        }
    }

    return (
        <div className={s.slider_arrow}
            style={position === 'right' ? {
            position: "absolute",
            cursor: 'pointer',
            top: '50%',
            display: visible ? 'block' : 'none',
            right: -20,
            opacity: images.length === 1 ? 0 : 1,
            padding: 20,
            transform: 'translate(0, -50%) rotate(-90deg)' ,
            color: 'white',
                transition: '.3s all ease',

        } : {
            position: "absolute",
            cursor: 'pointer',
            top: '50%',
            display: visible ? 'block' : 'none',
            left: -20,
                opacity: images.length === 1 ? 0 : 1,
                padding: 20,
            transform: 'translate(0, -50%) rotate(90deg)',
            color: 'white',
                transition: '.3s all ease',

        }}
             onClick={(e) => {
                 e.stopPropagation()
                 if(position === 'right') {
                     increment()
                 } else {
                     decrement()
                 }
                 setExpandedCardId(index)
             }}><ExpandMoreIcon/></div>
    )
}


export default HeroNavigation;