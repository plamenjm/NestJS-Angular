import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config';
import {Cfg, ProcArg, TSConfigService, ProcEnv} from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<TSConfigService>(ConfigService)
  if (configService.get(Cfg.help)) {
    console.log('env. vars:', ProcEnv)
    console.log('arguments:', Object.values(ProcArg))
    return
  }

  await app.listen(configService.get(Cfg.port) || 3000);
}
void bootstrap();
