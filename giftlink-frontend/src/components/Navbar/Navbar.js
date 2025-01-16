import React from 'react';
import "./Navbar.css";
export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-links">
           
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="navbar-brand nav-brand-customized" href="/">GiftLink</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/home.html">Home</a> 
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app">Gifts</a> 
                    </li>
                </ul>
            </div>
        </nav>
    );
}