import { Module } from '@nestjs/common';
//import {ConfigService} from '@nestjs/config';
//import {Config} from '../config';
import {cfgProc} from '../config';
import {LiveTradesWSClientGateway} from './live-trades-wsclient.gateway';
import {LiveTradesServerGateway} from './live-trades-server.gateway';

@Module({
    providers: [
        //{provide: LiveTradesWSClientGateway, inject: [ConfigService],
        //    useFactory: (config: ConfigService) => config.get(Config.liveTradesServer) ? null : LiveTradesWSClientGateway},
        ...(!cfgProc().liveTradesClient ? [] : [LiveTradesWSClientGateway]),
        ...(!cfgProc().liveTradesServer ? [] : [LiveTradesServerGateway]),
    ],
})
export class LiveTradesModule {}
