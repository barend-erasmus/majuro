import { IPaymentGateway, IPaymentRepository, ISubscriptionRepository, ISubscriptionService, IValidator, OperationResult, Payment, Subscription, SubscriptionCreateResult } from '..';

export class SubscriptionService implements ISubscriptionService {

    constructor(
        protected paymentGateway: IPaymentGateway,
        protected paymentRepository: IPaymentRepository,
        protected subscriptionRepository: ISubscriptionRepository,
        protected subscriptionValidator: IValidator<Subscription>,
    ) {

    }

    public async cancel(type: string, userId: string): Promise<boolean> {
        const subscription: Subscription = await this.subscriptionRepository.find(type, userId);

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

        const firstPayment: Payment = payments[0];

        await this.paymentGateway.cancel(firstPayment.token);

        await this.subscriptionRepository.delete(subscription.id);

        return true;
    }

    public async create(subscription: Subscription): Promise<OperationResult<SubscriptionCreateResult>> {
        const operationResult: OperationResult<SubscriptionCreateResult> = new OperationResult<SubscriptionCreateResult>(null);

        this.subscriptionValidator.validate(subscription, operationResult);

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        let subscriptionCreate: Subscription = null;
        let uri: string = null;

        try {
            subscriptionCreate = await this.subscriptionRepository.create(subscription);
        } catch (error) {
            operationResult.addError(error);
            operationResult.addMessage('error', null, 'An error occured while saving subscription');

            return operationResult;
        }

        try {
            uri = await this.paymentGateway.createURIForSubscription(subscription);
        } catch (error) {
            operationResult.addError(error);
            operationResult.addMessage('error', null, 'An error occured while retrieving URI for subscription');

            await this.subscriptionRepository.delete(subscription.id);

            return operationResult;
        }

        operationResult.setResult(new SubscriptionCreateResult(subscription.id, uri));

        return operationResult;
    }

    public async isPaid(type: string, userId: string): Promise<boolean> {
        const subscription: Subscription = await this.subscriptionRepository.find(type, userId);

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
