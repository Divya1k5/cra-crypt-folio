import React, { Component } from 'react';
import './Header.css';
import logo from '../../img/logo.svg';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="logoAndAppName">
                    <img src={logo} className="appLogo" alt="logo" />
                    <h2>CryptFolio</h2>
                </div>
            </header>
        );
    }
}