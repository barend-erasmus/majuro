import { Subscription } from '..';

export interface ISubscriptionRepository {

    create(subscription: Subscription): Promise<Subscription>;

    delete(subscriptionId: number): Promise<void>;

    find(userId: string): Promise<Subscription>;

}
