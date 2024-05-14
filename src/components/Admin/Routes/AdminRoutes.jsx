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
                    <Route element={<AnimalDataTable/>} path={'/zoo-front/admin/animals'}/>
                    <Route element={<AnimalViewsDataTable/>} path={'/zoo-front/admin/animal-views'}/>
                    <Route element={<ReviewsDataTable withToolBar={false} withActions={false}/>} path={'/zoo-front/admin/reports'}/>
                    <Route element={<ServicesDataTable/>} path={'/zoo-front/admin/services'}/>
                    <Route element={<HabitatsDataTable withToolBar={true}/>} path={'/zoo-front/admin/habitat'}/>
                    <Route element={<UserDataTable/>} path={'/zoo-front/admin/users'}/>
                    <Route element={<Navigate to={'/zoo-front/admin/animals'} />} path='*'></Route>
                </Routes>
            </div>
        </div>
    )
};

export default AdminRoutes;