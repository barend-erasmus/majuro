import { IHashAlgorithm } from '../interfaces/hash-algorithm';
import { Majuro } from '../majuro';

export class SDBM implements IHashAlgorithm {

    public calculate(str: string): string {
        let h: number = 0;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h = str.charCodeAt(i) + (h << 6) + (h << 16) - h;
        }

        return h.toString(16);
    }

}
