import React from 'react';
import s from "./Routes.module.css";
import {Toaster} from "react-hot-toast";
import {Navigate, Route, Routes} from "react-router-dom";
import EmployeeNavbar from "../ui/Navbar/EmployeeNavbar";
import RatesDataTable from "../Employee/DataTables/RatesDataTable";
import FullFeaturedCrudGrid from "../Employee/DataTables/FoodDataTable";


const EmployeeRoutes = () => {
    return (

        <div className={s.flexWrapper}>
            <EmployeeNavbar/>
            <div></div>
            <div className={s.content}>
                <div><Toaster/></div>
                <Routes>
                    <Route element={<RatesDataTable/>} path={'/employee/rates'}/>
                    <Route element={<FullFeaturedCrudGrid/>} path={'/employee/food'}/>
                    <Route element={<Navigate to={'/employee/rates'} />} path='*'></Route>
                </Routes>
            </div>

        </div>
    )
};

export default EmployeeRoutes;