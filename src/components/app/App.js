import React, { Component } from 'react';
import Header from '../header/Header';
import OfflineBar from '../notification/OfflineBar';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { routes } from '../appRoutes/routes';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <section className="app">

                <section>
                    <Header />
                    <OfflineBar />
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
