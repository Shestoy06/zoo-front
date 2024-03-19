import React from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom";
import AnimalDataTable from "../DataTables/AnimalDataTable";
import Navbar from "../ui/Navbar/Navbar";
import s from './Routes.module.css'
import ReportsDataTable from "../DataTables/ReportsDataTable";
import {Toaster} from "react-hot-toast";
import ServicesDataTable from "../DataTables/ServicesDataTable";


const AdminRoutes = () => {
    return (

        <div className={s.flexWrapper}>
            <Navbar/>
            <div></div>
            <div className={s.content}>
                <div><Toaster/></div>
                <Routes>
                    <Route element={<AnimalDataTable/>} path={'/admin/animals'}/>
                    <Route element={<ReportsDataTable/>} path={'/admin/reports'}/>
                    <Route element={<ServicesDataTable/>} path={'/admin/services'}/>
                    <Route element={<Navigate to={'/admin/animals'} />} path='*'></Route>
                </Routes>
            </div>

        </div>
    )
};

export default AdminRoutes;