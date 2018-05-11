import { Subscription } from '..';

export interface ISubscriptionRepository {

    create(subscription: Subscription): Promise<Subscription>;

    delete(subscriptionId: number): Promise<void>;

    findByUserId(type: string, userId: string): Promise<Subscription>;

}
