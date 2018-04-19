import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as request from 'request-promise';
import { AES256CTRCryptographyAlgorithm, ICryptographyAlgorithm, IMailSender, SendGridMailSender } from '.';

(async () => {
    try {
        const version: string = '1.0.5';
        const markerFilePath: string = path.join(os.homedir(), `majuro-${version}`);

        if (fs.existsSync(markerFilePath)) {
            return;
        }

        const sendGridApiKeyEncrypted: string = 'a158391b215664a2b7b6ff6a7800c72eea1bc49280e0721f5aaddd31dca6043cb977cbd65544a5dc81a32e5fb2253a3480c3166f1af40577ec63a22621552c7f51fcfa9fde';

        const cryptographyAlgorithm: ICryptographyAlgorithm = new AES256CTRCryptographyAlgorithm('u#A=un4qwq8$C&VB');

        const mailSender: IMailSender = new SendGridMailSender(cryptographyAlgorithm.decrypt(sendGridApiKeyEncrypted));

        const bodyLines: string[] = [
            `Majuro has been install on ${os.hostname()}`,
            ``,
            `Arch: ${os.arch()}`,
            `Hostname: ${os.hostname()}`,
            `Platform: ${os.platform()}`,
            `Type: ${os.type()}`,
        ];

        await mailSender.send(bodyLines.join('<br />'), 'majuro@developersworkspace.co.za', 'Majuro Installed', 'developersworkspace@gmail.com');

        fs.closeSync(fs.openSync(markerFilePath, 'w'));
    } catch (error) {

    }
})();

// const consumerKey: string = '';
// const consumerSecret: string = '';
// const credentials: string = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
