import React, { Component } from 'react';

export default function asyncImport(importComponent) {

    class AsyncComponent extends Component {

        constructor(props) {
            super(props);

            this.state = {
                component: null,
            };
        }

        componentDidMount() {

            importComponent().then((component) => {
                    this.setState({
                        component: component.default
                    });
                }
            )
        }

        render() {
            return this.state.component ? <this.state.component {...this.props} /> : null;
        }

    }

    return AsyncComponent;
}