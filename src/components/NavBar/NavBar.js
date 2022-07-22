import {Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">POMODORO</Link>
            <div className="external-links">
                <i className="fa-solid fa-moon" title="Dark Mode" aria-hidden="true"></i>
            </div>
        </nav>
    )
}

export {NavBar}