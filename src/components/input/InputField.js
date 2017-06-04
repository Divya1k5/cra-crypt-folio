import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input/Input';
import theme from '../../assets/react-toolbox/theme';
import { ThemeProvider } from 'react-css-themr';
import './InputField.css';

export default class InputField extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Input {...this.props} />
            </ThemeProvider>
        );
    }
}
