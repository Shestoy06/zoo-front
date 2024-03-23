import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import React, {useState} from "react";
import EmployeeRoutes from "./Admin/Routes/EmployeeRoutes";
import VetRoutes from "./Admin/Routes/VetRoutes";
import Login from "./Admin/Login/Login";

const Router = () => {

    const[user, setUser] = useState(null)

    if (user === "admin") {
        return <AdminRoutes/>

    } else if (user === "employee") {
        return <EmployeeRoutes/>

    } else if (user === "vet") {
        return <VetRoutes/>

    }

    return (

        <Routes>
            <Route path={'/login'} element={<Login setUser={setUser}/>}/>
            <Route element={<Navigate to={'/login'} />} path='*'></Route>
        </Routes>

    )
}

export default Router