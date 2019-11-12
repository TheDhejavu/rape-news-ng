import React, { Component } from "react";
import {  NavLink } from "react-router-dom";
import "./style.scss";

const Sidebar = props=>{
    return (
        <aside className="app-layout__sidebar">
            <div className="app-layout-sidebar__panel">
                <div className="app-layout-sidebar__top">
                    <div className="logo-container text-center">
                        <h4 className="logo">n. </h4>
                    </div>
                </div>
                <nav className="app-layout-sidebar__nav">
                    <ul className="nav-lists__top">
                        <li>
                            <NavLink to={"/feed" }  activeClassName='active' className="ripple"><i className='uil uil-home'></i> Feed</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/analytics"} className="ripple"><i className='uil uil-monitor-heart-rate'></i> Analytics</NavLink>
                        </li>
                </ul>
                </nav>
            </div>
        </aside>
    );
}
export default Sidebar;

