import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AnimalDataTable from "../DataTables/AnimalDataTable";
import Navbar from "../ui/Navbar/Navbar";
import s from './Routes.module.css'
import ReviewsDataTable from "../DataTables/ReviewsDataTable";
import {Toaster} from "react-hot-toast";
import ServicesDataTable from "../DataTables/ServicesDataTable";
import HabitatsDataTable from "../DataTables/HabitatsDataTable";
import UserDataTable from "../DataTables/UserDataTable";
import AnimalViewsDataTable from "../DataTables/AnimalViewsDataTable";


const AdminRoutes = ({logOut}) => {
    return (
        <div className={s.flexWrapper}>
            <Navbar logOut={logOut}/>
            <div></div>
            <div className={s.content}>
                <div><Toaster/></div>
                <Routes>
                    <Route element={<AnimalDataTable/>} path={'/admin/animals'}/>
                    <Route element={<AnimalViewsDataTable/>} path={'/admin/animal-views'}/>
                    <Route element={<ReviewsDataTable withToolBar={false} withActions={false}/>} path={'/admin/reports'}/>
                    <Route element={<ServicesDataTable/>} path={'/admin/services'}/>
                    <Route element={<HabitatsDataTable/>} path={'/admin/habitat'}/>
                    <Route element={<UserDataTable/>} path={'/admin/users'}/>
                    <Route element={<Navigate to={'/admin/animals'} />} path='*'></Route>
                </Routes>
            </div>
        </div>
    )
};

export default AdminRoutes;