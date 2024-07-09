import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import logo from '../../assets/images/Logo (1).svg';

export const Header = () => {
    return (
        <div className="header">
                <div className="header__logo">
                    <img src={logo} alt="" className="header__logo-img"/>
                    <a href="/" className="header__logo-link">Project <p>manager</p></a>
                </div>
                <Navbar /> 
        </div>
    );
};
