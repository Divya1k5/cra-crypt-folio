import React from 'react';
import Card from '../components/cards/Card';
import { coinTypes, api } from '../common/constants';
import { shallow, mount } from "enzyme";
import fetchMock from 'fetch-mock';

describe('Shallow/Mount Testing on Card', () => {

    const numOfCoins = 10;
    const buyPrice = 100;

    const mockResponse = {
            "data": {
                "amount": "350",
                "currency": "USD"
                }
        };

    const btcCardWithNoData = shallow(<Card numOfCoins='' buyPrice='' type='BTC'/>);
    const btcCardWithData = shallow(<Card numOfCoins={numOfCoins} buyPrice={buyPrice} type='BTC'/>);

    it('Each card calls correct coinbase api', () => {

        coinTypes.map((type) => {

            const coinbaseUrl = api[type];

            fetchMock.get(coinbaseUrl, {
                status: 200,
                body: mockResponse
            });

            mount(<Card numOfCoins={numOfCoins} buyPrice={buyPrice} type={type}/>);

            expect(fetchMock.called()).toEqual(true);
            expect(fetchMock.lastUrl()).toEqual(coinbaseUrl);
            expect(fetchMock.calls().unmatched).toEqual([]);
            fetchMock.restore();
        });

    });

    it('Card with non null data should be in details mode', () => {
        expect(btcCardWithData.find('.card .details').length).toEqual(1);
        expect(btcCardWithData.find('.card .edit').length).toEqual(0);
    });

    it('Card with null data should be in edit mode', () => {
        expect(btcCardWithNoData.find('.card .edit').length).toEqual(1);
        expect(btcCardWithNoData.find('.card .details').length).toEqual(0);
    });
});