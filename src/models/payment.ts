import { IClonable } from '../interfaces/clonable';

export class Payment implements IClonable<Payment> {

    constructor(
        public id: number,
        public subscriptionId: number,
        public timestamp: Date,
        public token: string,
    ) {

    }

    public clone(): Payment {
        return new Payment(this.id, this.subscriptionId, this.timestamp, this.token);
    }

}
