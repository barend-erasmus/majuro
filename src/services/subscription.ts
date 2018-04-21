import { IPaymentGateway, IPaymentRepository, ISubscriptionRepository, ISubscriptionService, IValidator, OperationResult, Subscription, SubscriptionCreateResult } from '..';

export class SubscriptionService implements ISubscriptionService {

    constructor(
        protected paymentGateway: IPaymentGateway,
        protected paymentRepository: IPaymentRepository,
        protected subscriptionRepository: ISubscriptionRepository,
        protected subscriptionValidator: IValidator<Subscription>,
    ) {

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
            uri = await this.paymentGateway.createURIForSubscription(subscription);
        } catch {
            operationResult.addMessage('error', null, 'An error occured while retrieving URI for subscription');
        }

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        try {
            subscriptionCreate = await this.subscriptionRepository.create(subscription);
        } catch {
            operationResult.addMessage('error', null, 'An error occured while saving subscription');
        }

        if (operationResult.hasErrors()) {
            return operationResult;
        }

        operationResult.setResult(new SubscriptionCreateResult(subscription.id, uri));

        return operationResult;
    }
}
