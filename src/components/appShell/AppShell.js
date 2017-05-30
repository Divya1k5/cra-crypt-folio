import React, { Component } from 'react';
import './AppShell.css';
import Header from '../header/Header';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { routes } from '../../common/routes';

export default class AppShell extends Component {
    render() {
        return (
            <section className="app">

                <section>
                    <Header />
                    <NavBar />
                </section>

                <section className="appContent">
                    { routes }
                </section>

                <Footer />
            </section>
        );
    }
}
