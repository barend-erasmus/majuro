import axios from 'axios';
import { IMailSender } from '../interfaces/mail-sender';

export class SendGridMailSender implements IMailSender {

    constructor(
        protected apiKey: string,
    ) {
    }

    public async send(body: string, from: string, subject: string, to: string): Promise<void> {
        const result: any = await axios({
            data: {
                content: [
                    {
                        type: 'text/html',
                        value: body,
                    },
                ],
                from: {
                    email: from,
                },
                personalizations: [
                    {
                        subject,
                        to: [
                            {
                                email: to,
                            },
                        ],
                    },
                ],
            },
            headers: {
                authorization: `bearer ${this.apiKey}`,
            },
            method: 'POST',
            url: 'https://api.sendgrid.com/v3/mail/send',
        });

        console.log(result);
    }

}
