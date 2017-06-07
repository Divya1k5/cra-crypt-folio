import React, { Component } from 'react';
import Header from '../header/Header';
import NavBar from '../navBar/NavBar';
import OfflineBar from '../notification/OfflineBar';
import Footer from '../footer/Footer';
import { routes } from '../appRoutes/routes';
import theme from '../../assets/react-toolbox/theme';
import { ThemeProvider } from 'react-css-themr';
import '../../assets/react-toolbox/theme.css';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <section className="app">

                    <section className="header">
                        <Header />
                        <OfflineBar />
                        <NavBar />
                    </section>

                    <section className="appContent">
                        { routes }
                    </section>

                    <section className="footer">
                        <Footer />
                    </section>
                </section>
            </ThemeProvider>
        );
    }
}
