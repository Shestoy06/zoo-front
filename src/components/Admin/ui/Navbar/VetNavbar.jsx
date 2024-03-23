import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SummarizeIcon from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";

const VetNavbar = () => {
    return (
        <div className={s.navbar}>
            <h2 className={s.title}>Arcadia Vet</h2>
            <NavLink to={"/veterinarian/reports"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <SummarizeIcon/> Vet. Reports</NavLink>
            <NavLink to={"/veterinarian/food"} className={({isActive, isPending, isTransitioning}) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <LocalDiningIcon/>Animal food</NavLink>
            <NavLink to={"/veterinarian/habitat"} className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? s.active : "",
                    isTransitioning ? "transitioning" : "",
                    s.link
                ].join(" ")
            }> <HomeIcon/> Habitats</NavLink>
        </div>
    );
}
export default VetNavbar;