import { OperationResult } from '..';

export interface IValidator<T> {

    validate(object: T, operationResult: OperationResult<any>): Promise<OperationResult<any>>;

}
