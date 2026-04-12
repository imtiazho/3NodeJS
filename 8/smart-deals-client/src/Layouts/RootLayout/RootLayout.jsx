import React from 'react';
import Home from '../../Pages/Home/Home';
import NavBar from '../../Components/Shared/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;