import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

const EmployeeNavbar = () => {
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
            }> <StarIcon/>Food</NavLink>
        </div>
    );
}
export default EmployeeNavbar;