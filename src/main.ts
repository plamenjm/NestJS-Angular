import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ConfigService} from '@nestjs/config';
import {Cfg, ProcArg, TSConfigService, ProcEnv} from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //abortOnError: false,
  });

  const configService = app.get<TSConfigService>(ConfigService)
  if (configService.get(Cfg.help)) {
    console.log('env. vars:', ProcEnv)
    console.log('arguments:', Object.values(ProcArg))
    return
  }

  await app.listen(configService.get(Cfg.port) || 3000);
}
void bootstrap();
