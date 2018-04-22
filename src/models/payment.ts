export class Payment {

    constructor(
        public id: number,
        public subscriptionId: number,
        public timestamp: Date,
        public token: string,
    ) {

    }

}
