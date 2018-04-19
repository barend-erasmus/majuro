import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ILogger, LogglyLogger } from '.';

(async () => {
    const logger: ILogger = new LogglyLogger(['install'], 'f33d8263-6b9d-489d-8cbb-2016ba55d937');

    logger.log(`Installed on ${os.hostname()}`, {
        arch: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
    });
})();
