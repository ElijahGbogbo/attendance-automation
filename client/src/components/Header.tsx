import type {JSX} from "react";
import "../styles/Header.css";

function Header(): JSX.Element {
    return(
        <div className="logo-title-container">
            <img src="./img/Alive-Mentorship-School-Logo.jpg" alt="Alive Mentorship School Logo" className="school-logo" />
            <h1 className="app-title">Attendance Automation</h1>
        </div>
    )
}

export default Header
