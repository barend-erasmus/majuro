import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ILogger, LogglyLogger } from '.';

(async () => {
    const logger: ILogger = new LogglyLogger(['install'], '898781b0-befb-48a2-a5f3-9ee51e393ab2');

    logger.log(`Installed on ${os.hostname()}`, {
        arch: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
    });
})();
