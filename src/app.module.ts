import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import config, {cfgProc} from './config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveTradesModule } from './live-trades/live-trades.module';
//import { LiveTradesClientGateway } from './live-trades-client/live-trades-client.gateway';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          load: [config],
          //ignoreEnvFile: true,
          //envFilePath: ['.env'],
      }),
      EventEmitterModule.forRoot(),
      LiveTradesModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
      //...(!cfgProc().liveTradesTestClient ? [] : [LiveTradesClientGateway]), //to-do
  ],
})
export class AppModule {}
