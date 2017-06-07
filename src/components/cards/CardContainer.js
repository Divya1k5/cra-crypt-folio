import React, { Component } from 'react';
import Card from './Card';
import AddCardBtn from './AddCardBtn';
import './CardContainer.css';
import Slider from 'react-slick';
import { localStorageKey, coinTypes } from '../../common/constants';
import { getObjFromLocalStorage, setObjInLocalStorage, isMobileDevice } from '../../common/utils';

export default class CardContainer extends Component {

    constructor(props) {
        super(props);

        let cards = getObjFromLocalStorage(localStorageKey) || {};
        cards = this.sanitizeData(cards);
        this.state = {
            cards: cards || {},
            activeCardIndex: 0
        };
    }

    static createNewCard(type) {
        const newCard = {};
        newCard[type] = { type: type, numOfCoins: '', buyPrice: ''};
        return newCard;
    }

    sanitizeData(cards) {
        const sanitizedInputs = {};
        Object.keys(cards).forEach((key) => {
            if (cards[key] && this.isCoinTypeValid(cards[key].type) && cards[key].numOfCoins && cards[key].buyPrice) {
                sanitizedInputs[key] = cards[key];
            }
            return 0;
        });
        return sanitizedInputs;
    }
    
    addCard(cardType) {

        const cardAddedAlready = this.hasCardBeenAddedAlready(this.state.cards, cardType);

        if (!cardAddedAlready) {
            const updatedCards = Object.assign({}, this.state.cards, CardContainer.createNewCard(cardType));
            this.setState({
                cards: updatedCards,
                activeCardIndex: Object.keys(updatedCards).length - 1
            });
        }
    }

    hasCardBeenAddedAlready(cards, cardType) {
        return Object.keys(cards).find((card) => card === cardType);
    }

    isCoinTypeValid(type) {
        return coinTypes.find((coin) => coin === type);
    }

    deleteCard(type) {

        const updatedCards = Object.assign({},this.state.cards);

        if (updatedCards[type]) {
            delete updatedCards[type];
            this.setState({
                cards: updatedCards,
                activeCardIndex: 0
            });

            setObjInLocalStorage(localStorageKey, updatedCards);
        }
    }

    updateCard(type, data) {

        const updatedCards = Object.assign({},this.state.cards);

        if (updatedCards[type]) {
            updatedCards[type] = data;

            this.setState({
                cards: updatedCards
            });

            setObjInLocalStorage(localStorageKey, updatedCards);
        }
    }

    buildCards() {
        return (
            Object.keys(this.state.cards).map((type, index) => {

                const card = this.state.cards[type];
                if (!card && !card.type) {
                    return 0;
                }

                const numOfCoins = card.numOfCoins || '';
                const buyPrice = card.buyPrice || '';

                return <div key={card.type}><Card numOfCoins={numOfCoins} buyPrice={buyPrice} type={card.type}
                                                  deleteCard={this.deleteCard.bind(this)}
                                                  updateCard={this.updateCard.bind(this)}
                                                  isActive={this.state.activeCardIndex === index}  /></div>
            })
        )
    }

    render() {

        const carouselSettings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: this.state.activeCardIndex
        };

        return (
                <div>

                    { Object.keys(this.state.cards).length === 0 ?

                        <div>
                            <div className="message">You don't own any cryptocoins in your profile yet! </div>
                            <div className="message">Click on the + button on the bottom right to start adding coins to your profile</div>
                        </div>

                        :
                            isMobileDevice() && Object.keys(this.state.cards).length > 0 ?

                                <Slider {...carouselSettings} key={Object.keys(this.state.cards).length}>
                                    { this.buildCards() }
                                </Slider>
                            :
                                <div className="cardContainer">
                                    { this.buildCards() }
                                </div>

                    }

                    <AddCardBtn addCard={this.addCard.bind(this)} />

                </div>
        );
    }
}