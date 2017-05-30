import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link key='Form' to='/'>Home</Link>
                    </li>
                    <li>
                        <Link key='Summary' to='/summary'>Summary</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}