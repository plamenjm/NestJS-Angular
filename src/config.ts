//import {config}  from 'dotenv';
import {ConfigService} from '@nestjs/config';


//---

export const Config = {
    LiveTradesUrl: 'wss://api.bitfinex.com/ws/1',
    LiveTradesSubscribe: [
        '{"event": "subscribe", "channel": "trades", "pair": "BTCUSD"}',
        '{"event": "subscribe", "channel": "trades", "pair": "BTCEUR"}',
    ],
    LiveTradesSymbol: ['BTCUSD', 'BTCEUR'],

    LiveTradesCorsOrigin: 'http://localhost:8000',
    //LiveTradesCorsOrigin: '*',
}


//---

export enum CfgProc {
    liveTradesServerOnly = 'liveTradesServerOnly',
    liveTradesTestClient = 'liveTradesTestClient',
}

type TSCfgProc = {
    [CfgProc.liveTradesServerOnly]: boolean,
    [CfgProc.liveTradesTestClient]: boolean,
}


//---

export enum Cfg {
    //liveTradesServerOnly = 'liveTradesServerOnly',

    help = 'help',
    port = 'port',
}

interface TSCfg extends TSCfgProc {
    //[Cfg.liveTradesServerOnly]: boolean,

    [Cfg.help]: boolean,
    [Cfg.port]: number,
}


//---

// $ npm run start -- -- --liveTradesTestClient --port 3001
// $ nest start -- --liveTradesTestClient --port 3001
export enum ProcArg {
    help = '--help',
    helpShort = '-h',
    port = '--port',

    liveTradesServerOnly = '--liveTradesServerOnly',
    liveTradesTestClient = '--liveTradesTestClient',
}


//---

export type TSConfigService = ConfigService<TSCfg>

export const ProcEnv = ['PORT'] as const
type TSProcEnv = { [Key in typeof ProcEnv[number]]: string }

declare global {
    namespace NodeJS {
        //interface ProcessEnv {PORT: string}
        interface ProcessEnv extends TSProcEnv { }
    }
}


//---

export function cfgProc() {
    //noinspection TypeScriptUnresolvedVariable
    const procArg: string[] = process.argv
    const isArg = (name: ProcArg) => 1 + procArg.indexOf(name)

    return {
        procArg,
        isArg,
        liveTradesServerOnly: isArg(ProcArg.liveTradesServerOnly),
        liveTradesTestClient: isArg(ProcArg.liveTradesTestClient),
    }
}

export default () => {
    //config()

    //noinspection TypeScriptUnresolvedVariable
    const env: TSProcEnv = process.env
    const proc = cfgProc()

    const argValue = (name: ProcArg) => {
        const idx = proc.isArg(name) - 1
        return idx < 0 ? undefined
            : idx + 1 < proc.procArg.length ? proc.procArg[idx + 1]
                : undefined
    }

    return {
        //env,
        //...proc,
        //argValue,
        help: proc.isArg(ProcArg.help) || proc.isArg(ProcArg.helpShort),
        port: parseInt(argValue(ProcArg.port) || env.PORT),
    }
}
