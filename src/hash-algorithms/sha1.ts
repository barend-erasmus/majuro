import * as crypto from 'crypto';
import { IHashAlgorithm } from '..';

export class SHA1 implements IHashAlgorithm {

    public calculate(str: string): string {
        const generator = crypto.createHash('sha1');

        generator.update(str);

        return generator.digest('hex');
    }

}
