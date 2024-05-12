import {Routes, Route, Navigate} from "react-router-dom"
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import React, {useState} from "react";
import EmployeeRoutes from "./Admin/Routes/EmployeeRoutes";
import VetRoutes from "./Admin/Routes/VetRoutes";
import Login from "./Admin/Login/Login";
import Home from "./Client/Home";
import HeroImage from './Client/Hero/HeroImage'

const Router = () => {

    const[user, setUser] = useState(null)
    const role = localStorage.getItem('role')

    const logOut = () => {
        localStorage.setItem('role', '')
        window.location.reload();
    }

    if (user === "admin") {
        return <AdminRoutes logOut={logOut}/>

    } else if (user === "employee") {
        return <EmployeeRoutes logOut={logOut}/>

    } else if (user === "veterinarian") {
        return <VetRoutes logOut={logOut}/>

    }

    return (

        <Routes>
            <Route path={'/login'} element={<Login setUser={setUser}/>}/>
            <Route path={'/home'} element={<Home/>}/>
            <Route path={'/image'} element={<HeroImage/>}/>
            <Route element={<Navigate to={role ? '/login' : '/home'} />} path='*'></Route>
        </Routes>

    )
}

export default Router