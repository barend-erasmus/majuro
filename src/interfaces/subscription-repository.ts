import { Subscription } from '..';

export interface ISubscriptionRepository {

    create(subscription: Subscription): Promise<Subscription>;

    delete(subscriptionId: number): Promise<void>;

    find(type: string, userId: string): Promise<Subscription>;

}
