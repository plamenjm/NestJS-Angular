
export const Config = {
    //Api: 'http://localhost:3000/yoummday/test',
    Api: 'http://95.217.79.100:1042',

    sendMailService: 'hotmail',
    sendMailUser: '***@***.com',
    sendMailPass: '***',
    sendMailCC: '***@***.com',

    TestLogRequest: false,
    TestLogReqBody: false,
    TestLogResponse: false,
}

//todo
//import {MailerService} from '@nestjs-modules/mailer';
//constructor(private readonly mailerService: MailerService) {}

//hint
//    getRequest: (body = undefined): RequestInit => ({
//        method: body ? 'POST' : 'GET',
//        headers: {
//            ...(!body ? {} : {'Content-Type': 'application/x-www-form-urlencoded'}),
//            //'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
//            //Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//            //'Accept-Language': 'en-US,en;q=0.5',
//            //'Accept-Encoding': 'gzip, deflate',
//            //'Upgrade-Insecure-Requests': '1',
//            //'Sec-GPC': '1',
//
//            //Host: '95.217.79.100:1042',
//            //'Content-Length': '76',
//            //Origin: Config.Api,
//            //DNT: '1',
//            //Connection: 'keep-alive',
//            //'Referer': Config.Api + '/',
//        },
//        body,
//        //referrer: Config.Api + '/',
//        //mode: "cors",
//        //credentials: "omit",
//    }),
