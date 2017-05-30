import React, { Component } from 'react';
import './AddCardBtn.css';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';

export default class AddCardBtn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    openMenu() {

        this.setState({
            isOpen: !this.state.isOpen
        })

    }

    addCard(type) {
        if (typeof this.props.addCard === 'function') {
            this.props.addCard(type);
        }
    }

    render() {
        return (
            <div className="addCardBtn" onClick={this.openMenu.bind(this)}>

                {this.state.isOpen ? (
                    <div className="cta"><MdClose /></div>
                ) : (
                    <div className="cta"><MdAdd /></div>
                )}

                {this.state.isOpen ? (

                    <div className="menu">
                        <div className="btc item" onClick={this.addCard.bind(this, 'BTC')}>BTC</div>
                        <div className="eth item" onClick={this.addCard.bind(this, 'ETH')}>ETH</div>
                        <div className="ltc item" onClick={this.addCard.bind(this, 'LTC')}>LTC</div>
                    </div>

                ) : null}

            </div>
        );
    }
}