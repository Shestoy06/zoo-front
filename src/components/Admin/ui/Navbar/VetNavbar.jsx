import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SummarizeIcon from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const VetNavbar = ({logOut}) => {
    return (
        <div className={s.navbar}>
            <h2 className={s.title}>Arcadia Vet</h2>
            <NavLink to={"zoo-front/veterinarian/reports"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <SummarizeIcon/> Vet. Reports</NavLink>
            <NavLink to={"zoo-front/veterinarian/food"} className={({isActive, isPending, isTransitioning}) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <LocalDiningIcon/>Animal food</NavLink>
            <NavLink to={"zoo-front/veterinarian/habitat"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <HomeIcon/> Habitats</NavLink>
            <NavLink to={"zoo-front/login"} onClick={logOut} className={({ isActive, isPending, isTransitioning }) =>
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
export default VetNavbar;