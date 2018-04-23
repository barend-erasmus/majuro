export interface ILogger {

    debug(message: string, meta?: any): void;

    error(error: Error, meta?: any): void;

    info(message: string, meta?: any): void;

    log(message: string, meta?: any): void;

    warning(message: string, meta?: any): void;

}
