import {Injectable} from '@angular/core';
import {TodoLog} from './logger-interfaces';

@Injectable()
export class LoggerState {
  loggs: TodoLog[] = [];
}
