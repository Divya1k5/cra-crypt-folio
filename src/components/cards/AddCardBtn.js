import React, { Component } from 'react';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';
import { coinTypes } from '../../common/constants';
import { isMobileDevice } from '../../common/utils';
import './AddCardBtn.css';

export default class AddCardBtn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        }
    }

    onAddBtnClick() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });

    }

    addCard(type) {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
        if (typeof this.props.addCard === 'function') {
            this.props.addCard(type);
        }
    }

    render() {

        const menuItemSeparatorHeight = 80;

        return (
            <div className="addCardBtnMenu">

                <div className="primaryBtn target" onClick={this.onAddBtnClick.bind(this)} data-test="primaryBtn">
                    {this.state.isMenuOpen ? (
                        <div className="cta"><MdClose /></div>
                    ) : (
                        <div className="cta"><MdAdd /></div>
                    )}
                </div>

                <div className="list">

                    {
                        coinTypes.map((coinType, idx) => {

                            let itemStyle = { };


                            if (isMobileDevice()) {
                                itemStyle = {
                                    left: (-1 * ((idx + 1) * menuItemSeparatorHeight)) + 'px',
                                    bottom: 0,
                                    opacity: this.state.isMenuOpen ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in'
                                };
                            } else {
                                itemStyle = {
                                    top: (-1 * ((idx + 1) * menuItemSeparatorHeight)) + 'px',
                                    opacity: this.state.isMenuOpen ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in'
                                };
                            }
                            return <div key={coinType} className="item cta target" style={itemStyle} onClick={this.addCard.bind(this, coinType)}>{coinType}</div>;
                        })
                    }


                </div>

            </div>
        );
    }
}