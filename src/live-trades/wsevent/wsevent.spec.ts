import { WSEvent } from './wsevent';
import {Trades} from '../types/types.interface';

describe('WSEvent', () => {
  it('should be defined', () => {
    expect(new WSEvent([] as unknown as Trades)).toBeDefined();
  });
});
