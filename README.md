# Nest.js

Playground (Nest.js 10, WebSocket, Socket.io)


<details><summary>

### Yummy task - Simple 'robot' script - request task and execute

</summary>

```
$ npm run start:dev
> nestjs@0.0.1 start:dev
⠋  TSC  Initializing type checker...
[Nest] 3023259  - 02/14/2024, 2:13:01 AM     LOG [NestFactory] Starting Nest application...
[Nest] 3023259  - 02/14/2024, 2:13:01 AM     LOG [NestApplication] Nest application successfully started +3ms
task ADD: 31176 47279
task XOR: 422307 511785
task MD5: 119278696700
task CURL: /?p=444826114883
task "MAILTO:***.***@***.com?subject=***:%20I%20solved%20the%20riddle&body=Hi,%0A"
```

JSON Response - summary of executed tasks

```
{
  "tasks": [
    {
      "task": "ADD: 31176 47279",
      "token": "1.o20.10hb.s8vcft.d4ded27a5a227ae914ac03572466929b",
      "error": null,
      "step": "1/6",
      "answer": "78455"
    },
    {
      "task": "XOR: 422307 511785",
      "token": "2.91ur.ayw9.s8vcft.d3a03380e4840086750d69653be6d025",
      "error": null,
      "step": "2/6",
      "answer": "114314"
    },
    {
      "task": "MD5: 119278696700",
      "token": "3.2k1a.exks.s8vcfu.9e1d4f00ca9fe6fafaa5876f2447bcb3",
      "error": null,
      "step": "3/6",
      "answer": "3678d37f6846495d2723c313acb5876f"
    },
    {
      "task": "CURL: /?p=444826114883",
      "token": "4.9j8a.2gn7.s8vcfu.f3beae48a92da380ffccdd1b2e853f9f",
      "step": "4/6",
      "answer": 666953
    },
    {
      "task": ""MAILTO:***.***@***.com?subject=***:%20I%20solved%20the%20riddle&body=Hi,%0A"",
      "token": "5.0.0.s8vcfu.cdaeba05dae13a1895c2c54c71da603f",
      "error": null,
      "step": "5/6",
      "answer": "250 2.0.0 OK <***@***.com> [Hostname=***.com]"
    }
  ]
}
```

</details>


<details><summary>

### Live Trades - WebSocket client and Socket.io server

</summary>

Subscribe for real-time events (live). Get events history.
Backend: Nest.js; Frontend: React.js (See symfony-react project)

```
$ npm run start
> nestjs@0.0.1 start
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

$ npm install --save-dev @swc/cli
$ npm exec -- nest generate service Yoummday

$ npm install @nestjs/config
$ npm install @nestjs/websockets
$ npm install ws
$ npm install --save-dev @types/ws
$ npm install @nestjs/platform-socket.io
$ npm install @nestjs/event-emitter
$ npm install --save-dev socket.io-client
$ npm exec -- nest generate module liveTrades
$ npm exec -- nest generate gateway WSClient liveTrades
$ npm exec -- nest generate gateway Server liveTrades
$ npm exec -- nest generate gateway TestClient liveTrades
$ npm exec -- nest generate interface Types liveTrades
$ npm exec -- nest generate class Config liveTrades
$ npm exec -- nest generate class WSEvent liveTrades
```

</details>
