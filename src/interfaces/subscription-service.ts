import { OperationResult, Subscription, SubscriptionCreateResult } from '..';

export interface ISubscriptionService {

    cancel(userId: string): Promise<boolean>;

    create(subscription: Subscription): Promise<OperationResult<SubscriptionCreateResult>>;

    isPaid(userId: string): Promise<boolean>;

}
