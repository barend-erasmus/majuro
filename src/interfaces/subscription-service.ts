import { OperationResult, Subscription, SubscriptionCreateResult } from '..';

export interface ISubscriptionService {

    create(subscription: Subscription): Promise<OperationResult<SubscriptionCreateResult>>;

    isPaid(userId: string): Promise<boolean>;

}
