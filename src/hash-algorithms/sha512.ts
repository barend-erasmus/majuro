import * as crypto from 'crypto';
import { IHashAlgorithm } from '..';

export class SHA512 implements IHashAlgorithm {

    public calculate(str: string): string {
        const generator = crypto.createHash('sha512');

        generator.update(str);

        return generator.digest('hex');
    }

}
