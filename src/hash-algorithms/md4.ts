import * as crypto from 'crypto';
import { IHashAlgorithm } from '..';

export class MD4 implements IHashAlgorithm {

    public calculate(str: string): string {
        const generator = crypto.createHash('md4');

        generator.update(str);

        return generator.digest('hex');
    }

}
