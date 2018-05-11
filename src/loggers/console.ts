import { ILogger } from '..';

export class ConsoleLogger implements ILogger {

    public debug(message: string, meta?: any): void {
        console.log(`DEBUG: ${message}`);
    }

    public error(error: Error, meta?: any): void {
        console.log(`ERR: ${error.message}`);
    }

    public info(message: string, meta?: any): void {
        console.log(`INFO: ${message}`);
    }

    public log(message: string, meta?: any): void {
        console.log(`LOG: ${message}`);
    }

    public warning(message: string, meta?: any): void {
        console.log(`WARN: ${message}`);
    }
}
