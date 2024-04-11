import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import PetsIcon from '@mui/icons-material/Pets';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Button} from "@mui/material";

const Navbar = ({logOut}) => {
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
            <NavLink to={"/admin/animal-views"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <BarChartIcon/> Animals views</NavLink>
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
            <NavLink to={"/admin/users"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }><SupervisedUserCircleIcon/> Users</NavLink>
                <NavLink to={"/login"} onClick={logOut} className={({ isActive, isPending, isTransitioning }) =>
                    [
                            isPending ? "pending" : "",
                            isActive ? s.active : "",
                            isTransitioning ? "transitioning" : "",
                            s.link
                    ].join(" ")
                }><ExitToAppIcon style={{color: "#e33232"}}/> Log out</NavLink>
        </div>
    );
};



export default Navbar;