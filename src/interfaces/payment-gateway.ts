import { Subscription } from '..';

export interface IPaymentGateway {

    createURIForSubscription(subscription: Subscription): Promise<string>;

}
