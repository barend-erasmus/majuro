import { Subscription } from '..';

export interface ISubscriptionRepository {

    create(subscription: Subscription): Promise<Subscription>;

}
