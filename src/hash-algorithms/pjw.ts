import { IHashAlgorithm } from '../interfaces/hash-algorithm';
import { Majuro } from '../majuro';

export class PJW implements IHashAlgorithm {

    public calculate(str: string): string {
        Majuro.getDefaultLoggerForRuntime().log(`calculate('${str}')`, {
            class: 'PJW',
            method: 'calculate',
            namespace: 'hash-algorithms',
            parameters: {
                str,
            },
        });

        let h: number = 0;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h = (h << 4) + str.charCodeAt(i);
        }

        return h.toString(16);
    }

}
