//import {config}  from 'dotenv';
import {ConfigService} from '@nestjs/config';


//---

export enum CfgProc {
    liveTradesClient = 'liveTradesClient',
    liveTradesServer = 'liveTradesServer',
    liveTradesTestClient = 'liveTradesTestClient',
}

type TSCfgProc = {
    [CfgProc.liveTradesClient]: boolean,
    [CfgProc.liveTradesServer]: boolean,
    [CfgProc.liveTradesTestClient]: boolean,
}


//---

export enum Cfg {
    //liveTradesClient = 'liveTradesClient',
    //liveTradesServer = 'liveTradesServer',

    help = 'help',
    port = 'port',
}

interface TSCfg extends TSCfgProc {
    //[Cfg.liveTradesClient]: boolean,
    //[Cfg.liveTradesServer]: boolean,

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

    liveTradesClient = '--liveTradesClient',
    liveTradesServer = '--liveTradesServer',
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
        liveTradesClient: isArg(ProcArg.liveTradesClient),
        liveTradesServer: isArg(ProcArg.liveTradesServer),
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
