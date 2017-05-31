import React, { Component } from 'react';
import Card from './Card';
import AddCardBtn from './AddCardBtn';
import './CardContainer.css';
import Slider from 'react-slick';

export default class CardContainer extends Component {

    constructor(props) {
        super(props);

        let cards = JSON.parse(localStorage.getItem('cryptfolio')) || {};

        cards = this.sanitizeInput(cards);

        this.state = {
            cards: cards || {},
            currentSlide: 0
        };

        this.isMobileDevice = this.isMobileDevice();
    }

    sanitizeInput(cards) {
        const sanitizedInputs = {};
        Object.keys(cards).map((type) => {
            const card = cards[type];
            if (card && card.numOfCoins && card.buyPrice) {
                sanitizedInputs[type] = cards[type];
            }
            return 0;
        });
        return sanitizedInputs;
    }
    
    addCard(type) {

        const cardAddedAlready = this.hasCardBeenAddedAlready(type);

        if (!cardAddedAlready) {
            const newCard = {};
            newCard[type] = { type: type, numOfCoins: '', buyPrice: ''};
            const updatedCards = Object.assign({}, this.state.cards, newCard);
            this.setState({
                cards: Object.assign({}, this.state.cards, newCard),
                currentSlide: Object.keys(updatedCards).length - 1
            });
        } else {
            console.log('Do Nothing');
        }
    }

    deleteCard(type) {

        const updatedCards = this.state.cards || {};
        if (updatedCards[type]) {
            delete updatedCards[type];
            this.setState({
                cards: updatedCards,
                currentSlide: 0
            });
            localStorage.setItem('cryptfolio', JSON.stringify(updatedCards));
        }
    }

    updateCard(type, data) {

        const updatedCards = this.state.cards || {};
        if (updatedCards[type]) {
            updatedCards[type] = data;
            this.setState({
                cards: updatedCards
            });
            localStorage.setItem('cryptfolio', JSON.stringify(updatedCards));
        }
    }

    hasCardBeenAddedAlready(type) {

        let cardAdded = false;

        Object.keys(this.state.cards).forEach((index, card) => {
            if (card.type === type) {
                cardAdded = true;
            }
        });

        return cardAdded;
    }

    isMobileDevice() {
        if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }
    }

    render() {

        const carouselSettings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: this.state.currentSlide
        };

        return (
                <div>
                {
                    this.isMobileDevice && Object.keys(this.state.cards).length > 0 ?
                        <div>
                            <div className="mobile">
                                <Slider {...carouselSettings} key={Object.keys(this.state.cards).length}>
                                    {
                                        Object.keys(this.state.cards).map((type) => {
                                            const card = this.state.cards[type];
                                            if (!card && !card.type) {
                                                return 0;
                                            }

                                            const numOfCoins = card.numOfCoins || '';
                                            const buyPrice = card.buyPrice || '';
                                            return <div key={card.type}><Card numOfCoins={numOfCoins} buyPrice={buyPrice} type={card.type} deleteCard={this.deleteCard.bind(this)} updateCard={this.updateCard.bind(this)} /></div>
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    :
                        <div>
                            <div className="cardContainer">
                                {
                                    Object.keys(this.state.cards).map((type) => {
                                        const card = this.state.cards[type];
                                        if (!card && !card.type) {
                                            return 0;
                                        }

                                        const numOfCoins = card.numOfCoins || '';
                                        const buyPrice = card.buyPrice || '';
                                        return <Card key={card.type} numOfCoins={numOfCoins} buyPrice={buyPrice} type={card.type} deleteCard={this.deleteCard.bind(this)} updateCard={this.updateCard.bind(this)} />
                                    })


                                }
                            </div>
                        </div>
                }

                <AddCardBtn addCard={this.addCard.bind(this)} />

                </div>
        );
    }
}