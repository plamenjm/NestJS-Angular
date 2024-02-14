import {Body, Controller, Get, Post, Query, Req} from '@nestjs/common';
import { AppService } from './app.service';
import {YummyService} from './yummy/yummy.service';
import {ITask} from './yummy/API';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly yoummdayService: YummyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('yoummday')
  getYoummday() {
    return this.yoummdayService.run()
  }

  @Get('yoummday/test')
  testYoummday1(@Query('p') queryP: string) {
    return this.yoummdayService.testResponse(queryP)
  }

  @Post('yoummday/test')
  testYoummday(@Query('p') queryP: string, @Body() body: string) {
    return this.yoummdayService.testResponse(queryP, body as ITask)
  }
}
