import { Subscription } from '..';

export interface IPaymentGateway {

    cancel(token: string): Promise<boolean>;

    createURIForSubscription(subscription: Subscription): Promise<string>;

}
