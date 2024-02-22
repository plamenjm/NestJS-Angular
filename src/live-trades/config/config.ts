
export const Config = {
    LiveTradesUrl: 'wss://api.bitfinex.com/ws/1',
    LiveTradesSubscribe: [
        '{"event": "subscribe", "channel": "trades", "pair": "BTCUSD"}',
        '{"event": "subscribe", "channel": "trades", "pair": "BTCEUR"}',
    ],
    LiveTradesSymbol: ['BTCUSD', 'BTCEUR'],

    LiveTradesCorsOrigin: 'http://localhost:8000',
    //LiveTradesCorsOrigin: '*',
}
