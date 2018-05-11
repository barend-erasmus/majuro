import { expect } from 'chai';
import 'mocha';
import { Frequency, IPaymentGateway, PayFastPaymentGateway, Subscription } from '..';

describe('PayFastPaymentGateway', () => {

    let paymentGateway: IPaymentGateway = null;

    beforeEach(async () => {
        paymentGateway = new PayFastPaymentGateway(
            'https://example.com/cancel',
            '10000100',
            '46f0cd694581a',
            'https://example.com/notify',
            null,
            'https://example.com/return',
            true,
        );
    });

    describe('createURIForSubscription', () => {

        it('should return URI', async () => {

            const result: string = await paymentGateway.createURIForSubscription(
                new Subscription(10,
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    Frequency.Monthly,
                    1,
                    'Lorem ipsum',
                    'type',
                    'userId'));

            // tslint:disable-next-line:max-line-length
            expect(result).to.be.eq('https://sandbox.payfast.co.za/eng/process?amount=10&cancel_url=https%3A%2F%2Fexample.com%2Fcancel%3FsubscriptionId%3D1&cycles=0&email_address=userId&frequency=3&item_description=Lorem+ipsum+dolor+sit+amet%2C+consectetur+adipiscing+elit.&item_name=Lorem+ipsum&m_payment_id=1&merchant_id=10000100&merchant_key=46f0cd694581a&name_first=userId&notify_url=https%3A%2F%2Fexample.com%2Fnotify&payment_method=cc&return_url=https%3A%2F%2Fexample.com%2Freturn%3FsubscriptionId%3D1&subscription_type=1&signature=bc08e996f9083c70d3d0ebfe4e910fc0');

        });

    });

});
