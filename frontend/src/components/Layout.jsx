import React from 'react'
import { Outlet } from 'react-router-dom'
import Newssectionnewlook from "./Pages/Inquirenow"; // import the component

const Layout = () => {
    return (
        <div>
            <Outlet />
                  <Newssectionnewlook /> {/* Always visible on all pages */}

        </div>
    )
}

export default Layout