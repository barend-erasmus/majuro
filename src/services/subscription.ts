import { IPaymentGateway, IPaymentRepository, ISubscriptionRepository, ISubscriptionService, IValidator, OperationResult, Payment, Subscription, SubscriptionCreateResult } from '..';
import { Majuro } from '../majuro';

export class SubscriptionService implements ISubscriptionService {

    constructor(
        protected paymentGateway: IPaymentGateway,
        protected paymentRepository: IPaymentRepository,
        protected subscriptionRepository: ISubscriptionRepository,
        protected subscriptionValidator: IValidator<Subscription>,
    ) {

    }

    public async create(subscription: Subscription): Promise<OperationResult<SubscriptionCreateResult>> {
        Majuro.getDefaultLoggerForRuntime().log(`create(subscription)`, {
            class: 'SubscriptionService',
            method: 'create',
            namespace: 'services',
            parameters: {
                subscription,
            },
        });

        const operationResult: OperationResult<SubscriptionCreateResult> = new OperationResult<SubscriptionCreateResult>(null);

        this.subscriptionValidator.validate(subscription, operationResult);

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        let subscriptionCreate: Subscription = null;
        let uri: string = null;

        try {
            subscriptionCreate = await this.subscriptionRepository.create(subscription);
        } catch {
            operationResult.addMessage('error', null, 'An error occured while saving subscription');
        }

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        try {
            uri = await this.paymentGateway.createURIForSubscription(subscription);
        } catch {
            operationResult.addMessage('error', null, 'An error occured while retrieving URI for subscription');

            await this.subscriptionRepository.delete(subscription.id);
        }

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        operationResult.setResult(new SubscriptionCreateResult(subscription.id, uri));

        return operationResult;
    }

    public async isPaid(userId: string): Promise<boolean> {
        Majuro.getDefaultLoggerForRuntime().log(`isPaid('${userId}')`, {
            class: 'SubscriptionService',
            method: 'isPaid',
            namespace: 'services',
            parameters: {
                userId,
            },
        });

        const subscription: Subscription = await this.subscriptionRepository.find(userId);

        if (!subscription) {
            return null;
        }

        let payments: Payment[] = await this.paymentRepository.list(subscription.id);

        if (payments.length === 0) {
            return false;
        }

        payments = payments.sort((a: Payment, b: Payment) => {
            return a.timestamp.getTime() - b.timestamp.getTime();
        });

        const firstPaymentTimestamp: Date = payments[0].timestamp;

        const numberOfDaysSinceFirstPayment: number = (new Date().getTime() - firstPaymentTimestamp.getTime()) / 86400000;

        const numberOfPaymentsExpected: number = (numberOfDaysSinceFirstPayment / subscription.frequency) + 1;

        if (payments.length < Math.floor(numberOfPaymentsExpected)) {
            return false;
        }

        return true;
    }
}
