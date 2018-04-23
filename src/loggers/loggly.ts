import axios, { AxiosResponse } from 'axios';
import { ILogger } from '..';

export class LogglyLogger implements ILogger {

    constructor(
        protected tags: string[],
        protected token: string,
    ) {

    }

    public debug(message: string, meta?: any): void {
        if (!meta) {
            meta = {};
        }

        meta.level = 'debug';

        this.log(message, meta);
    }

    public error(error: Error, meta?: any): void {
        if (!meta) {
            meta = {};
        }

        meta.error = error;

        meta.level = 'error';

        this.log(error.message, meta);
    }

    public info(message: string, meta?: any): void {
        if (!meta) {
            meta = {};
        }

        meta.level = 'info';

        this.log(message, meta);
    }

    public log(message: string, meta?: any): void {
        if (!meta) {
            meta = {};
        }

        const data: any = meta;

        data.message = message;

        axios({
            data,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            url: `http://logs-01.loggly.com/inputs/${this.token}${this.tags.length > 0 ? `/tag/${this.tags.join(',')}` : ``}`,
        }).then((response: AxiosResponse<any>) => {

        });
    }

    public warning(message: string, meta?: any): void {
        if (!meta) {
            meta = {};
        }

        meta.level = 'warning';

        this.log(message, meta);
    }

}
