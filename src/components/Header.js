import logo from "../images/logo.svg";
import {Link, Routes, Route} from 'react-router-dom';
import React from "react";

function Header(props) {
    const [currentUrl, setCurrentUrl] = React.useState('');

    function chgUrl() {
        setCurrentUrl(window.location.pathname);
    }

    return (
        <header className="header">

            <nav className="header__menu">
                <a href="/" className="header__link" title="Place - Russia">
                    <img src={logo} className="header__logo" alt="лого Mesto" />
                </a>

                {!props.loggedIn &&
                    <>
                     <Link className="header__menu-link" onClick={chgUrl}
                           to={window.location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
                         {window.location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
                     </Link>
                    </>
                    //
                    // <Routes>
                    //     <Route path='/sign-up' element={<Link to='/sign-in' className="header__menu-link">Войти</Link>} />
                    //     <Route path='/sign-in' element={<Link to='/sign-up' className="header__menu-link">Регистрация</Link>} />
                    // </Routes>
                 }
                {props.loggedIn &&
                    (
                        <>
                            <span className="header__logout-wrap">
                                <p className="header__menu-text">{props.email}</p>
                                <a onClick={props.onLogout} className="header__menu-link">Выйти</a>
                            </span>
                        </>
                    )
                }
            </nav>

        </header>
    )
}

export default Header