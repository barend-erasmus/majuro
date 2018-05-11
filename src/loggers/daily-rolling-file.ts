import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { ILogger } from '..';

export class DailyRollingFileLogger implements ILogger {

    constructor(
        protected filePath: string,
        protected format: string,
        protected name: string,
    ) {
        if (!this.format) {
            format = 'YYYY-MM-DD';
        }
    }

    public debug(message: string, meta?: any): void {
        fs.appendFile(path.join(this.filePath, `${this.name}-${moment().format(this.format)}.log`), JSON.stringify({
            level: 'debug',
            message,
            meta,
        }), (err: Error) => {

        });
    }

    public error(error: Error, meta?: any): void {
        fs.appendFile(path.join(this.filePath, `${this.name}-${moment().format(this.format)}.log`), JSON.stringify({
            error,
            level: 'error',
            meta,
        }), (err: Error) => {

        });
    }

    public info(message: string, meta?: any): void {
        fs.appendFile(path.join(this.filePath, `${this.name}-${moment().format(this.format)}.log`), JSON.stringify({
            level: 'info',
            message,
            meta,
        }), (err: Error) => {

        });
    }

    public log(message: string, meta?: any): void {
        fs.appendFile(path.join(this.filePath, `${this.name}-${moment().format(this.format)}.log`), JSON.stringify({
            message,
            meta,
        }), (err: Error) => {

        });
    }

    public warning(message: string, meta?: any): void {
        fs.appendFile(path.join(this.filePath, `${this.name}-${moment().format(this.format)}.log`), JSON.stringify({
            level: 'warning',
            message,
            meta,
        }), (err: Error) => {

        });
    }
}
