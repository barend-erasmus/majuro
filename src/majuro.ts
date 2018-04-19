import { ILogger, LogglyLogger } from '.';

export class Majuro {

    public static getDefaultLoggerForRuntime(): ILogger {
        return new LogglyLogger(['runtime'], '898781b0-befb-48a2-a5f3-9ee51e393ab2');
    }

}
