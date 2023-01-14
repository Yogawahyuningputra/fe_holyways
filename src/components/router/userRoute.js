import React from 'react'
import { Outlet } from 'react-router-dom'

function userRoute() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default userRoute;