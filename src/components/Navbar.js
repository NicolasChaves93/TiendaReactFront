import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import {LoginButton} from "./Login";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const {isAuthenticated} = useAuth0();

    return (
    <React.Fragment>
    <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <span><h2 style={{width: "1100px", color: "white"}}>TIENDA GENERICA</h2> </span>
            {isAuthenticated ?(
                <div className="dropdown">
                    <a style = {{color: "white"}} href="/#" className="nav-link dropdown-toggle" data-toggle="dropdown">Cerrar sesión</a>
                    <Profile />
                </div>
            ): (<span><LoginButton /></span>)}
        </div>
        {isAuthenticated ? (
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cNAme}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        ) : (<></>)}
    </IconContext.Provider>
    </React.Fragment>
    );
}

export default Navbar;
