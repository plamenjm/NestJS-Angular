import {Config} from './Config';

export interface ITask {task?: string, token?: string, answer?: string, error?: string, res?: string}

export const API = {
    getRequest: (body = undefined): RequestInit => ({
        method: body ? 'POST' : 'GET',
        headers: {
            ...(!body ? {} : {'Content-Type': 'application/x-www-form-urlencoded'}),
        },
        body,
    }),

    parseTextResponse: (res: string): ITask => {
        let text = (/\nJSON: ({.*})\n/g).exec(res)?.[1]
        if (!text) return {error: '"JSON" not found.', res}
        const json = JSON.parse(text)
        json.step = /<b>(.*)<\/b>/.exec(res)?.[1]
        if (!json.step) json.res = res
        return json
    },

    task: async function(token = '', answer = '', query = ''): Promise<ITask> {
        try {
            const body = !token ? undefined : `token=${token}&answer=${answer}&robot=on`
            const request = this.getRequest(body)
            if (Config.TestLogRequest) console.log('request', request)
            else if (Config.TestLogReqBody) console.log('req.body', body)

            const response = await fetch(Config.Api + query, request)
            const json = query ? await response.json()
                : this.parseTextResponse(await response.text())
            if (Config.TestLogResponse) console.log('response', json)
            return json
        } catch (ex) {
            return {error: ex.message}
        }
    },
}
