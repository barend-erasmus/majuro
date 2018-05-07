import { Frequency } from '..';

export class Subscription {

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

}
