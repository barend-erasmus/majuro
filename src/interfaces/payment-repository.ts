import { Payment } from '..';

export interface IPaymentRepository {

    list(subscriptionId: number): Promise<Payment[]>;

}
