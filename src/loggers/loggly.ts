import axios, { AxiosResponse } from 'axios';
import { ILogger } from '../interfaces/logger';

export class LogglyLogger implements ILogger {

    constructor(
        protected tags: string[],
        protected token: string,
    ) {

    }

    public log(message: string, meta: any): void {
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

}
