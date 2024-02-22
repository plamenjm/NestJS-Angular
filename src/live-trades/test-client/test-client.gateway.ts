import {WebSocketGateway, OnGatewayInit, SubscribeMessage} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {io, Socket} from 'socket.io-client';
import {Cfg} from '../../config';

@WebSocketGateway()
export class TestClientGateway implements OnGatewayInit {
  private readonly LiveTradesUrl

  private socket: Socket
  private readonly logger = new Logger('Client')

  constructor(configService: ConfigService) {
    this.LiveTradesUrl = 'http://localhost:' + (configService.get(Cfg.port) || 3000)
  }

  afterInit() {
    this.logger.log('Init')
    this.socket = io(this.LiveTradesUrl)
    this.socket.on('connect', this.onConnect.bind(this))
    this.socket.on('live', this.onMessageLive.bind(this))
    this.socket.on('log', this.onMessageLog.bind(this))
  }

  onConnect() {
    this.log('connect')
    //this.emit('connection', '')
  }

  async onMessageLive(data: string) {
    this.log('>', 'live', data)
    //return "{event: 'log', data}"
  }

  async onMessageLog(data: string) {
    this.log('>', 'log', data)
  }


  //---

  log(action: string, prefix = '', data = '') {
    if (action) action = ' ' + action
    if (prefix) prefix += '/'
    if (data) data = ' ' + data
    this.logger.log(`[${prefix}${this.LiveTradesUrl}${action}]${data}`)
  }

  //???
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
