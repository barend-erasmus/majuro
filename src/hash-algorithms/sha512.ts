import * as crypto from 'crypto';
import { IHashAlgorithm } from '../interfaces/hash-algorithm';
import { Majuro } from '../majuro';

export class SHA512 implements IHashAlgorithm {

    public calculate(str: string): string {
        Majuro.getDefaultLoggerForRuntime().log(`calculate('${str}')`, {
            class: 'SHA512',
            method: 'calculate',
            namespace: 'hash-algorithms',
            parameters: {
                str,
            },
        });

        const generator = crypto.createHash('sha512');

        generator.update(str);

        return generator.digest('hex');
    }

}
