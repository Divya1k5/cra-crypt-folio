import React, { Component } from 'react';
import './AddCardBtn.css';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';
import { coinTypes } from '../../common/constants';

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

                <div className="primaryBtn target" onClick={this.onAddBtnClick.bind(this)}>
                    {this.state.isMenuOpen ? (
                        <div className="cta"><MdClose /></div>
                    ) : (
                        <div className="cta"><MdAdd /></div>
                    )}
                </div>

                <div className="list">

                    {this.state.isMenuOpen ?
                        
                        coinTypes.map((coinType, idx) => {

                            const itemStyle = {
                                top: (-1 * ((idx + 1) * menuItemSeparatorHeight)) + 'px'
                            };
                            return <div key={coinType} className="item cta target" style={itemStyle} onClick={this.addCard.bind(this, coinType)}>{coinType}</div>;
                        })
                        : null
                    }

                </div>

            </div>
        );
    }
}