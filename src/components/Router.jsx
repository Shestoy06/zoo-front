import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Client/Home/Home";
import App from "../App";
import AdminHome from "./Admin/AnimalDataTable";
const Router = () => {
    // <Route element={<Navigate to={'/'} />} path='*'></Route>


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/'></Route>
                <Route element={<AdminHome/>} path={'/admin'}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Router