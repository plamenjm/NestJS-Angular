import {Trades} from '../types/types.interface';

export class WSEvent {
    constructor(
        public trades: Trades,
    ) {}
}
