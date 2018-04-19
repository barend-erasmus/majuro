import * as os from 'os';
import * as request from 'request-promise';
import { AES256CTRCryptographyAlgorithm, ICryptographyAlgorithm, IMailSender, SendGridMailSender } from '.';

(async () => {
    const sendGridApiKeyEncrypted: string = 'a158391b215664a2b7b6ff6a7800c72eea1bc49280e0721f5aaddd31dca6043cb977cbd65544a5dc81a32e5fb2253a3480c3166f1af40577ec63a22621552c7f51fcfa9fde';

    const cryptographyAlgorithm: ICryptographyAlgorithm = new AES256CTRCryptographyAlgorithm('u#A=un4qwq8$C&VB');

    const mailSender: IMailSender = new SendGridMailSender(cryptographyAlgorithm.decrypt(sendGridApiKeyEncrypted));

    await mailSender.send(`Majuro has been install on ${os.hostname()}`, 'majuro@developersworkspace.co.za', 'Majuro Installed', 'developersworkspace@gmail.com');
})();

// const consumerKey: string = '';
// const consumerSecret: string = '';
// const credentials: string = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
