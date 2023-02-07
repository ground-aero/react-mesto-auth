import logo from "../images/logo.svg";

function Header(props) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="лого Mesto" />
        </header>
    )
}

export default Header