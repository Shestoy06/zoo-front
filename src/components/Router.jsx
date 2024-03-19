import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import React from "react";
import EmployeeRoutes from "./Admin/Routes/EmployeeRoutes";

const Router = () => {
    const user = "employee"

    if (user === "admin") {
        return (
            <AdminRoutes/>
        )
    } else if (user === "employee") {
        return <EmployeeRoutes/>
    }

    return (

        <Routes>
            <Route element={<Navigate to={'/'} />} path='*'></Route>
            <Route element={<div></div>} path='/'></Route>
            <AdminRoutes/>
            <EmployeeRoutes/>
        </Routes>

    )
}

export default Router