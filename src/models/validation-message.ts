import { IClonable } from '../interfaces/clonable';

export class ValidationMessage implements IClonable<ValidationMessage> {

    constructor(
        public code: string,
        public field: string,
        public message: string,
    ) {

    }

    public clone(): ValidationMessage {
        return new ValidationMessage(this.code, this.field, this.message);
    }

}
