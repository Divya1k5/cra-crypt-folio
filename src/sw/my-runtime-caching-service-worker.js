importScripts('sw-toolbox.js');

var api = {
    'BTC': 'https://api.coinbase.com/v2/prices/BTC-USD/buy',
    'ETH': 'https://api.coinbase.com/v2/prices/ETH-USD/buy',
    'LTC': 'https://api.coinbase.com/v2/prices/LTC-USD/buy'
};

for(var key in api) {
    if (api.hasOwnProperty(key)) {
        toolbox.router.get(api[key], toolbox.networkFirst);
    }
}
