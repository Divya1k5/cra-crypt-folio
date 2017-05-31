import React, { Component } from 'react';
import './Summary.css';
import { PieChart } from 'react-d3/piechart';

export default class Summary extends Component {

    constructor(props) {
        super(props);

        let data = JSON.parse(localStorage.getItem('cryptfolio')) || {};
        data = this.createPieData(data);

        this.state = {
            data: data
        };
    }

    createPieData(cards) {
        const pieData = [];
        let totalInvested = 0;

        Object.keys(cards).map((type) => {
            const card = cards[type];
            totalInvested = totalInvested + (Number(card.buyPrice) * Number(card.numOfCoins));
            return 0;
        });

        Object.keys(cards).map((type) => {
            const card = cards[type];
            if (card && card.numOfCoins && card.buyPrice) {
                let dataPoint = {};
                dataPoint.label = card.type;
                dataPoint.value = (Math.round(((Number(card.numOfCoins) * Number(card.buyPrice))/totalInvested) * 100));
                pieData.push(dataPoint);
             }
            return 0;
        });
        return pieData;
    }

    render() {

        const renderChart = Object.keys(this.state.data).length > 0;

        return (
            <div className="summary">

                {
                    renderChart ? (
                        <PieChart data={this.state.data} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white" title="" />
                    ) : (
                        <div> You don't own any cryptocoins in your profile yet!</div>
                    )
                }

            </div>
        );
    }
}
