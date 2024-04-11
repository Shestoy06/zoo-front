import React from 'react';
import s from "./Routes.module.css";
import {Toaster} from "react-hot-toast";
import {Navigate, Route, Routes} from "react-router-dom";
import FoodDataTable from "../Employee/DataTables/FoodDataTable";
import HabitatsDataTable from "../DataTables/HabitatsDataTable";
import VetNavbar from "../ui/Navbar/VetNavbar";
import ReviewsDataTable from "../DataTables/ReviewsDataTable";


const VetRoutes = ({logOut}) => {
    return (

        <div className={s.flexWrapper}>
            <VetNavbar logOut={logOut}/>
            <div></div>
            <div className={s.content}>
                <div><Toaster/></div>
                <Routes>
                    <Route element={<FoodDataTable withToolBar={false} withActions={false}/>} path={'/veterinarian/food'}/>
                    <Route element={<ReviewsDataTable withToolBar={true}/>} path={'/veterinarian/reports'}/>
                    <Route element={<HabitatsDataTable withToolBar={false} noDelete={true} imageModal={false} forVet={true}/>} path={'/veterinarian/habitat'}/>
                    <Route element={<Navigate to={'/veterinarian/reports'} />} path='*'></Route>
                </Routes>
            </div>

        </div>
    )
};

export default VetRoutes;