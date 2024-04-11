import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const EmployeeNavbar = ({logOut}) => {
    return (
        <div className={s.navbar}>
            <h2 className={s.title}>Arcadia employee</h2>
            <NavLink to={"/employee/rates"} className={({isActive, isPending, isTransitioning}) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <StarIcon/>Rates</NavLink>
            <NavLink to={"/employee/food"} className={({isActive, isPending, isTransitioning}) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <LocalDiningIcon/>Animal food</NavLink>
            <NavLink to={"/employee/services"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <LocalActivityIcon/> Services</NavLink>
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
}
export default EmployeeNavbar;