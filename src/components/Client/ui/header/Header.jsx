import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <NavLink to={'/home'} className={s.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</NavLink>
            <NavLink to={'/home'} className={s.link}>Animaux</NavLink>
            <NavLink to={'/home'} className={s.link}>Habitats</NavLink>
            <NavLink to={'/home'} className={s.link} style={{marginLeft: 'auto'}}>Log in</NavLink>
        </header>
    );
};

export default Header;