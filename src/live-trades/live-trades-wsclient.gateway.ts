import {Logger} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {OnGatewayInit, WebSocketGateway} from '@nestjs/websockets';
import {CloseEvent, ErrorEvent, MessageEvent, WebSocket} from 'ws';
import {Config} from '../config';


//--

export const WebSocketGatewayCors = {origin: Config.LiveTradesCorsOrigin}

export class LiveTradesEvent {
  constructor(
      public trades: object,
  ) {}
}


//---

@WebSocketGateway({cors: WebSocketGatewayCors})
export class LiveTradesWSClientGateway implements OnGatewayInit {
  private readonly logger = new Logger('Client')
  private readonly verbose = false

  private socket: WebSocket

  private messageCount = 0
  private tradesSave = 0

  constructor(private eventEmitter: EventEmitter2) {}

  afterInit() {
    this.reconnect()
  }

  private reconnect() {
    if (this.socket) this.socket.close()
    this.socket = new WebSocket(Config.LiveTradesUrl)
    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onclose = this.onClose.bind(this)
    this.socket.onerror = this.onError.bind(this)
  }

  log(action, message = '') {
    if (action) action = ' ' + action
    if (message) message = ' ' + message
    this.logger.log(`[${Config.LiveTradesUrl}${action}] ${message}`)
  }

  private getTrades(data: string): object {
    // messages:
    // [ 12430, [ [   '1494734166-tBTCUSD', 1705081553, 43535, 0.0156206 ] ] ]
    // [ 12430, 'te', '1494734166-tBTCUSD', 1705081553, 43535, 0.0156206 ]
    const trades = {}
    Config.LiveTradesSymbol.forEach(symbol => trades[symbol] = [])
    const json = JSON.parse(data)
    if (!Array.isArray(json)) return trades
    let events
    if (Array.isArray(json[1])) {
      events = json[1]
    } else if (json[1] === 'te') {
      json.shift()
      json.shift()
      events = [json]
    } else
      return trades

    events.forEach(event => {
      const id = event[0].split('-')
      const symbol = id[1].slice(1)
      if (trades[symbol]) trades[symbol].push(event)
    })
    return trades // [ 'BTCUSD' => [ '1494734166-tBTCUSD', 1705081553, 43535, 0.0156206 ] ]
  }

  private sendSubscribe(ws: WebSocket) {
    Config.LiveTradesSubscribe.forEach(data => {
      this.logger.log(`[${Config.LiveTradesUrl} <] ${data}`)
      ws.send(data)
    })
  }

  private onMessage({target, data}: MessageEvent) {
    if (typeof data !== 'string') return
    if (this.verbose) this.log('>', data)
    else if (this.messageCount && this.messageCount < 100 && this.messageCount % 10 === 0) this.log('>', '..........') // feedback: progress

    this.messageCount++
    const trades = this.getTrades(data)
    let count = 0
    Object.values(trades).forEach(events => count += events.length)
    if (count) {
      this.tradesSave += count
      this.eventEmitter.emit('LiveTradesEvent', new LiveTradesEvent(trades))
    }

    if (!this.verbose && this.messageCount && (this.messageCount === 100 || this.messageCount % 1000 === 0)) { // feedback: summary
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      const mem = 'memory: ' + Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB '
      const log = this.messageCount + ' (saved: ' + this.tradesSave + '), ' + mem
      this.log('messages', log)
    }

    if (this.messageCount === 1) setTimeout(() => this.sendSubscribe(target), 1000)
    //if (this.messageCount > 9) this.socket.close() // test
  }

  private onOpen() {
    this.log('open')
  }

  private onClose({code, reason}: CloseEvent) {
    this.log('close', `(${code}) ${reason}`)
    if (code !== 1000) setTimeout(() => this.reconnect(), 3000)
  }

  private onError({message}: ErrorEvent) {
    this.log('error', message)
  }
}
