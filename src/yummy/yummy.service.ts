import { join } from 'path';
import { Injectable } from '@nestjs/common';
import nodemailer, {SentMessageInfo} from 'nodemailer';
import {Config} from './Config';
import {API, ITask} from './API';
import {MD5} from './MD5';
import {Attachment} from 'nodemailer/lib/mailer';


//---

/**
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
      "task": "MAILTO:***.***@***.com?subject=***:%20I%20solved%20the%20riddle&body=Hi,%0A",
      "token": "5.0.0.s8vcfu.cdaeba05dae13a1895c2c54c71da603f",
      "error": null,
      "step": "5/6",
      "answer": "250 2.0.0 OK <***@***.com> [Hostname=***.com]"
    }
  ]
}
```
*/


//---

@Injectable()
export class YummyService {
    testResponse(queryP: string, body?: ITask) {
        let task
        if (queryP)
            return '{"answer": 654321, "success": 1, "error": null}' // CURL
        else if (!body)
            task = {task: 'ADD: 19144 88359', token: '1'}
        else if (body.token === '1')
            task = {task: 'XOR: 452221 357510', token: '2'}
        else if (body.token === '2')
            task = {task: 'MD5: 404903492720', token: '3'}
        else if (body.token === '3')
            task = {task: 'CURL: /?p=638423664588', token: '4'}
        else if (body.token === '4')
            task = {task: 'MAILTO:***.***@***.com?subject=***:%20I%20solved%20the%20riddle&body=Hi,%0A', token: '5'}
        else
            return '{"error": "Invalid token"}'
        task = {...task, error: null}
        return `<pre><b>${task.token}/6</b>\nJSON: ` + JSON.stringify(task) + '\n'
    }

    async run(): Promise<any> {
        const res: {
            error?: string,
            tasks: ITask[],
        } = {tasks: []}

        for (let i = 1; i < 10; i++) {
            const token = res.tasks[res.tasks.length - 1]?.token
            const answer = res.tasks[res.tasks.length - 1]?.answer
            const todo = await API.task(token, answer)
            console.log('task', todo.task)

            res.tasks.push(todo)
            const task = todo.task?.split(' ') ?? []
            if (!task.length) {
                todo.error = 'Invalid task.'
                break
            } else if (task[0] === 'ADD:') {
                todo.answer = '' + (+task[1] + +task[2])
            } else if (task[0] === 'XOR:') {
                todo.answer = '' + (+task[1] ^ +task[2])
            } else if (task[0] === 'MD5:') {
                todo.answer = MD5.md5(task[1])
            } else if (task[0] === 'CURL:') {
                const post = res.tasks[res.tasks.length - 1]?.token // for GET use ''
                const curl = await API.task(post, '', task[1])
                todo.answer = curl.answer
                todo.error = curl.error
            } else if (task[0].startsWith('MAILTO:')) {
                await this.sendEmail(todo)
                break
            } else {
                todo.error = 'Task not found.'
                break
            }
        }

        return res
    }

    async sendEmail(todo: ITask) {
        const fileS = 'yummy.service.ts', fileA = 'API.ts', dir = [__dirname, '..', '..', 'src', 'yummy']

        const to = /MAILTO:([^?]*)\?/.exec(todo.task ?? '')?.[1] ?? ''
        const subject = /[?&]subject=([^?&]*)([?&]|$)/.exec(todo.task ?? '')?.[1] ?? ''
        const text = /[?&]body=([^?&]*)([?&]|$)/.exec(todo.task ?? '')?.[1] ?? ''

        const mailOptions = {
            from: Config.sendMailUser,
            to,
            cc: Config.sendMailCC,
            subject: decodeURI(subject),
            text: `${decodeURI(text)}
                \nI solved the riddle using Nest.js 10.
                \nPlease, find the source code files attached to this email.
                \nThere are comments with sample console output and JSON response.
                \n
                \nProject repository: https://github.com/plamenjm/nestjs
                \n
                \nKind regards.
                \n`,
            attachments: [
                {filename: fileS + '.txt', path: join(...dir, fileS), contentDisposition: 'attachment'} as Attachment,
                {filename: fileA + '.txt', path: join(...dir, fileA), contentDisposition: 'attachment'} as Attachment,
            ],
        }

        //const nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({service: Config.sendMailService, auth: {
                user: Config.sendMailUser,
                pass: Config.sendMailPass,
            }})
        try {
            await new Promise(function (resolve, reject){
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) reject(error)
                    else resolve(info)
                })
            }).then((info: SentMessageInfo) => todo.answer = info.response,
                    error => todo.error = error.message)
        } catch (ex) {
            todo.error = ex.message
        }
    }
}
