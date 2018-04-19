import { IHashAlgorithm } from '../interfaces/hash-algorithm';

export class PJW implements IHashAlgorithm {

    public calculate(str: string): string {
        let h: number = 0;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h = (h << 4) + str.charCodeAt(i);
        }

        return h.toString(16);
    }

}
