import React, { Component } from 'react';
import Header from '../header/Header';
import OfflineBar from '../notification/OfflineBar';
import NavBar from '../navBar/NavBar';
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
            </ThemeProvider>
        );
    }
}
