import React from 'react'
import { Outlet } from 'react-router-dom'
function adminRoute() {
    return (

        <>
            <Outlet />
        </>
    )
}

export default adminRoute;