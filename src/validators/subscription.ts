import { IValidator, OperationResult, Subscription } from '..';

export class SubscriptionValidator implements IValidator<Subscription> {

    public async validate(object: Subscription, operationResult: OperationResult<Subscription>): Promise<OperationResult<Subscription>> {
        if (!object.amount) {
            operationResult.addMessage('validation', 'subscription.amount', 'Amount cannot be empty');
        }

        if (!object.frequency) {
            operationResult.addMessage('validation', 'subscription.frequency', 'Frequency cannot be empty');
        }

        if (!object.name) {
            operationResult.addMessage('validation', 'subscription.name', 'Name cannot be empty');
        }

        if (!object.userId) {
            operationResult.addMessage('validation', 'subscription.userId', 'User Id cannot be empty');
        }

        return operationResult;
    }

}
