import logo from "../images/logo.svg";
import {Link, Routes, Route} from 'react-router-dom';
import React from "react";

function Header(props) {
    return (
        <header className="header">

            <nav className="header__menu">
                <a href="/" className="header__link" title="Place - Russia">
                    <img src={logo} className="header__logo" alt="лого Mesto" />
                </a>

                <Routes>
                    <Route path='/sign-up' element={<Link to='/sign-in' className="header__menu-link">Войти</Link>} />
                    <Route path='/sign-in' element={<Link to='/sign-up' className="header__menu-link">Регистрация</Link>} />
                </Routes>
            </nav>

        </header>
    )
}

export default Header