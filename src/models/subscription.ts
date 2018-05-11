import { Frequency, IClonable } from '..';

export class Subscription implements IClonable<Subscription> {

    constructor(
        public amount: number,
        public description: string,
        public frequency: Frequency,
        public id: number,
        public name: string,
        public type: string,
        public userId: string,
    ) {

    }

    public clone(): Subscription {
        return new Subscription(this.amount, this.description, this.frequency, this.id, this.name, this.type, this. userId);
    }

}
