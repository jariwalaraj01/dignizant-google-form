import React from 'react'
import NavComponent from './Navs'
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return (
        <>
            <NavComponent />
            <Outlet />
        </>
    )
}

export default ProtectedRoute