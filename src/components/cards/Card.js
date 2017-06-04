import React, { Component } from 'react';
import './Card.css';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash-o';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import InputField from '../input/InputField';
import { api } from '../../common/constants';
import { isMobileDevice } from '../../common/utils';

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: !(this.props.numOfCoins && this.props.buyPrice),
            numOfCoins: this.props.numOfCoins || '',
            buyPrice: this.props.buyPrice || ''
        };
    }

    componentDidMount() {
        this.fetchCurrentPrice();
    }

    updateNumCoins(value) {
        this.setState({
            numOfCoins: value
        });

    }

    updateBuyPrice(value) {
        this.setState({
            buyPrice: value
        });
    }

    updateCard() {
        this.fetchCurrentPrice();
        this.flipCard();

        if (typeof this.props.updateCard === 'function') {
            this.props.updateCard(this.props.type, {type: this.props.type, numOfCoins: this.state.numOfCoins, buyPrice: this.state.buyPrice});
        }
    }

    flipCard() {
        this.setState({
            edit: !this.state.edit
        })
    }

    fetchCurrentPrice() {

        const url = api[this.props.type];

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((response) => {
                if (response) {
                    const difference = (response.data.amount - this.state.buyPrice) * this.state.numOfCoins;

                    this.setState({
                        currentPrice: response.data.amount,
                        isProfit: difference >= 0,
                        profit: Math.round(Math.abs(difference)) || 0,
                        profitPercentage: Math.round(((Math.abs(difference))/(this.state.buyPrice * this.state.numOfCoins) * 100)) || 0,

                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCard() {
        if (typeof this.props.deleteCard === "function") {
            this.props.deleteCard(this.props.type);
        }
    }

    render() {

        let cardClassNames = this.state.edit ? 'card edit': 'card details';
            cardClassNames += isMobileDevice() ? ' mobile': '';

        return (
            <div className={cardClassNames}>
                <div className="cardEdit">

                    <div className="nav">
                        <h2>{this.props.type}</h2>
                            <span className="right">
                            <span className="icon" onClick={this.deleteCard.bind(this)}><FaTrash /></span>
                            <span className="icon" onClick={this.updateCard.bind(this)}><FaCheckCircle /></span>
                        </span>
                    </div>
                    <form>
                        <InputField type='text' label='Number of coins' name='numOfCoins' value={this.state.numOfCoins} onChange={this.updateNumCoins.bind(this)} />
                        <InputField type='text' label='Buy price in USD' name='buyPrice' value={this.state.buyPrice} onChange={this.updateBuyPrice.bind(this)} />
                    </form>

                </div>

                <div className="cardDetails">

                    <div className="nav">
                        <h2>{this.props.type}</h2>
                        <span className="right">
                            <span className="icon" onClick={this.deleteCard.bind(this)}><FaTrash /></span>
                            <span className="icon" onClick={this.flipCard.bind(this)}><FaEdit /></span>
                        </span>
                    </div>

                    <div className="desc">
                        <div className="row">
                            <span># coins: </span>
                            <span>{this.state.numOfCoins || 0}</span>
                        </div>
                        <div className="row">
                            <span>Buy price: </span>
                            <span>{this.state.buyPrice || 0}</span>
                        </div>
                        <div className="row">
                            <span>Current price: </span>
                            <span>{this.state.currentPrice || 0}</span>
                        </div>
                        <div className="row">
                            <span>{this.state.isProfit ? 'Profit: ': 'Loss: '}</span>
                            <span>{this.state.profit}$</span>
                        </div>
                        <div className="row">
                            <span>{this.state.isProfit ? 'Profit%: ': 'Loss%: '}</span>
                            <span>{this.state.profitPercentage}%</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}