import { Module } from '@nestjs/common';
import {cfgProc} from '../config';
//import {ConfigService} from '@nestjs/config';
//import {Cfg} from '../config';
import { WSClientGateway } from './wsclient/wsclient.gateway';
import { ServerGateway } from './server/server.gateway';
//import { TestClientGateway } from './test-client/test-client.gateway';

@Module({
    providers: [
        //{provide: WSClientGateway, inject: [ConfigService],
        //    useFactory: (config: ConfigService) => config.get(Cfg.liveTradesClient) ? null : WSClientGateway},
        ...(!cfgProc().liveTradesClient ? [] : [WSClientGateway]),
        ...(!cfgProc().liveTradesServer ? [] : [ServerGateway]),
        //...(!cfgProc().liveTradesTestClient ? [] : [TestClientGateway]),
    ],
})
export class LiveTradesModule {}
