import { OperationResult, Subscription, SubscriptionCreateResult } from '..';

export interface ISubscriptionService {

    cancel(type: string, userId: string): Promise<boolean>;

    create(subscription: Subscription): Promise<OperationResult<SubscriptionCreateResult>>;

    isPaid(type: string, userId: string): Promise<boolean>;

}
