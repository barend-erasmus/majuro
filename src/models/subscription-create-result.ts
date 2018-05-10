import { IClonable } from '../interfaces/clonable';

export class SubscriptionCreateResult implements IClonable<SubscriptionCreateResult> {

    constructor(
        public id: number,
        public uri: string,
    ) {

    }

    public clone(): SubscriptionCreateResult {
        return new SubscriptionCreateResult(this.id, this.uri);
    }

}
