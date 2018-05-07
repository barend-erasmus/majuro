import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Frequency, IPaymentGateway, IPaymentRepository, ISubscriptionRepository, ISubscriptionService, IValidator, Payment, Subscription, SubscriptionService, SubscriptionValidator } from '..';

describe('SubscriptionService', () => {

    let paymentGateway: IPaymentGateway = null;
    let paymentRepository: IPaymentRepository = null;
    let subscriptionRepository: ISubscriptionRepository = null;
    let subscriptionService: ISubscriptionService = null;
    let subscriptionValidator: IValidator<Subscription> = null;

    beforeEach(async () => {
        paymentGateway = {} as IPaymentGateway;
        paymentRepository = {
            list: (subscriptionId: number) => {
                return Promise.resolve([]);
            },
        } as IPaymentRepository;
        subscriptionRepository = {
            find: (type: string, userId: string) => {
                return Promise.resolve(null);
            },
        } as ISubscriptionRepository;
        subscriptionValidator = new SubscriptionValidator();

        subscriptionService = new SubscriptionService(paymentGateway, paymentRepository, subscriptionRepository, subscriptionValidator);
    });

    describe('isPaid', () => {

        it('should return true given expected number of payments', async () => {

            sinon.stub(paymentRepository, 'list').returns([
                new Payment(null, null, new Date(2018, new Date().getMonth() - 2, 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth() - 1, 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth(), 1, 0, 0, 0), null),
            ]);

            sinon.stub(subscriptionRepository, 'find').returns(new Subscription(null, null, Frequency.Monthly, null, null, null, null));

            const result: boolean = await subscriptionService.isPaid(null, 'userId');

            expect(result).to.be.true;

        });

        it('should return false given less than expected number of payments', async () => {

            sinon.stub(paymentRepository, 'list').returns([
                new Payment(null, null, new Date(2018, new Date().getMonth() - 2, 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth() - 1, 1, 0, 0, 0), null),
            ]);

            sinon.stub(subscriptionRepository, 'find').returns(new Subscription(null, null, Frequency.Monthly, null, null, null, null));

            const result: boolean = await subscriptionService.isPaid(null, 'userId');

            expect(result).to.be.false;

        });

        it('should return true given more than expected number of payments', async () => {

            sinon.stub(paymentRepository, 'list').returns([
                new Payment(null, null, new Date(2018, new Date().getMonth() - 2, 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth() - 1, 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth(), 1, 0, 0, 0), null),
                new Payment(null, null, new Date(2018, new Date().getMonth() + 1, 1, 0, 0, 0), null),
            ]);

            sinon.stub(subscriptionRepository, 'find').returns(new Subscription(null, null, Frequency.Monthly, null, null, null, null));

            const result: boolean = await subscriptionService.isPaid(null, 'userId');

            expect(result).to.be.true;

        });

    });

});
