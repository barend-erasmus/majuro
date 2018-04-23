import axios, { AxiosResponse } from 'axios';
import * as moment from 'moment';
import { Frequency, IPaymentGateway, MD5, Subscription } from '..';
import { Majuro } from '../majuro';

export class PayFastPaymentGateway implements IPaymentGateway {

    constructor(
        protected cancelURI: string,
        protected merchantId: string,
        protected merchantSecret: string,
        protected notifyURI: string,
        protected returnURI: string,
        protected sandbox: boolean,
    ) {

    }

    public async cancel(token: string): Promise<boolean> {
        const params = {
            'merchant-id': this.merchantId,
            'passphrase': this.merchantSecret,
            'timestamp': moment().format('YYYY-MM-DDTHH:mm:ss[+02:00]'),
            'version': 'v1',
        };

        const sortedKeys: string[] = Object.keys(params).sort();

        const paramsString = sortedKeys.map((key: string) => `${key}=${encodeURIComponent(params[key].replace(new RegExp('\\\\', 'g'), ''))}`).join('&');

        const signature: string = new MD5().calculate(paramsString);

        const response: AxiosResponse<any> = await axios({
            headers: {
                'accept': 'application/json',
                'merchant-id': params['merchant-id'],
                'signature': signature,
                'timestamp': params['timestamp'],
                'version': params['version'],
            },
            method: 'PUT',
            url: `https://api.payfast.co.za/subscriptions/${token}/cancel`,
        });

        return true;
    }

    public async createURIForSubscription(subscription: Subscription): Promise<string> {
        Majuro.getDefaultLoggerForRuntime().log(`createURIForSubscription(subscription)`, {
            class: 'PayFastPaymentGateway',
            method: 'createURIForSubscription',
            namespace: 'gateways',
            parameters: {
                subscription,
            },
        });

        let frequency: number = null;

        switch (subscription.frequency) {
            case Frequency.Biyearly:
                frequency = 5;
                break;
            case Frequency.Monthly:
                frequency = 3;
                break;
            case Frequency.Quarterly:
                frequency = 4;
                break;
            case Frequency.Yearly:
                frequency = 6;
                break;
            default:
                throw new Error('Unsupported Frequency');
        }

        const params: any = {
            amount: subscription.amount.toString(),
            cancel_url: `${this.cancelURI}?subscriptionId=${subscription.id}`,
            cycles: 0,
            email_address: subscription.userId,
            frequency,
            item_description: subscription.description,
            item_name: subscription.name,
            m_payment_id: subscription.id.toString(),
            merchant_id: this.merchantId,
            merchant_key: this.merchantSecret,
            name_first: subscription.userId,
            notify_url: this.notifyURI,
            payment_method: 'cc',
            return_url: `${this.returnURI}?subscriptionId=${subscription.id}`,
            subscription_type: 1,
        };

        const sortedKeys: string[] = Object.keys(params);

        return `https://${this.sandbox ? 'sandbox' : 'www'}.payfast.co.za/eng/process?${sortedKeys.map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&')}`;
    }
}
