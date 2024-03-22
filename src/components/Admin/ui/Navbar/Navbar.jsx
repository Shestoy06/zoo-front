import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import PetsIcon from '@mui/icons-material/Pets';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <h2 className={s.title}>Arcadia admin</h2>
            <NavLink to={"/admin/animals"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <PetsIcon/> Animals</NavLink>
            <NavLink to={"/admin/habitat"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <HomeIcon/> Habitats</NavLink>
            <NavLink to={"/admin/reports"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <SummarizeIcon/> Vet. Reports</NavLink>
            <NavLink to={"/admin/services"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <LocalActivityIcon/> Services</NavLink>

        </div>
    );
};



export default Navbar;