# Nest.js

Playground (Nest.js 10, WebSocket, Socket.io)


<details><summary>

### Live Trades - WebSocket client and Socket.io server

</summary>

Subscribe for real-time events (live). Get events history.
Backend: Nest.js; Frontend: React.js (See symfony-react project)

```
$ npm run start
> nestjs@0.0.1 start
> nest start
[Nest] 2683256  - 02/12/2024, 12:40:39 AM     LOG [NestFactory] Starting Nest application...
[Nest] 2683256  - 02/12/2024, 12:40:39 AM     LOG [WebSocketsController] LiveTradesServerGateway subscribed to the "live" message +59ms
[Nest] 2683256  - 02/12/2024, 12:40:39 AM     LOG [WebSocketsController] LiveTradesServerGateway subscribed to the "log" message +0ms
[Nest] 2683256  - 02/12/2024, 12:40:39 AM     LOG [Client] [wss://api.bitfinex.com/ws/1 open] 
[Nest] 2683256  - 02/12/2024, 12:40:40 AM     LOG [Client] [wss://api.bitfinex.com/ws/1 <] {"event": "subscribe", "channel": "trades", "pair": "BTCUSD"}
[Nest] 2683256  - 02/12/2024, 12:40:40 AM     LOG [Client] [wss://api.bitfinex.com/ws/1 <] {"event": "subscribe", "channel": "trades", "pair": "BTCEUR"}
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [M_Uf3Tx7H5uewiawAAAC/1 connect]
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [idliPurUrvLhWDu5AAAD/2 connect]
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [live/M_Uf3Tx7H5uewiawAAAC/2 >] {"event": "subscribe", "channel": "trades", "pair": "BTCUSD"}
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [live/M_Uf3Tx7H5uewiawAAAC/2 >] {"event": "subscribe", "channel": "trades", "pair": "BTCEUR"}
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [log/idliPurUrvLhWDu5AAAD/2 <] 34 messages (BTCUSD, 2024-02-11 21:45:00/2024-02-11 22:45:01)
[Nest] 2683256  - 02/12/2024, 12:41:05 AM     LOG [Server] [idliPurUrvLhWDu5AAAD/1 disconnect]
[Nest] 2683256  - 02/12/2024, 12:41:33 AM     LOG [Client] [wss://api.bitfinex.com/ws/1 >]  ..........
[Nest] 2683256  - 02/12/2024, 12:45:02 AM     LOG [Server] [qCLkSIYcYibAkuJVAAAF/2 connect]
[Nest] 2683256  - 02/12/2024, 12:45:02 AM     LOG [Server] [log/qCLkSIYcYibAkuJVAAAF/2 <] 58 messages (BTCUSD, 2024-02-11 21:50:00/2024-02-11 22:50:01)
[Nest] 2683256  - 02/12/2024, 12:45:03 AM     LOG [Server] [qCLkSIYcYibAkuJVAAAF/1 disconnect]
[Nest] 2683256  - 02/12/2024, 12:45:33 AM     LOG [Client] [wss://api.bitfinex.com/ws/1 messages]  100 (saved: 88), memory: 57 MB 
[Nest] 2683256  - 02/12/2024, 12:46:48 AM     LOG [Server] [M_Uf3Tx7H5uewiawAAAC/0 disconnect] 
...
```

</details>


<details><summary>

#### done installs and todo notes

</summary>

```
$ npm install --save-dev @nestjs/cli; # npm install -g @nestjs/cli
$ npm exec -- nest new nestjs; # default: npm

$ npm install @nestjs/config
$ npm install @nestjs/websockets
$ npm install ws
$ npm install @types/ws
$ npm install @nestjs/platform-socket.io
$ npm install @nestjs/event-emitter
$ npm install --save-dev socket.io-client
$ npm exec -- nest generate module liveTrades
$ npm exec -- nest generate gateway liveTradesClient
```

</details>
