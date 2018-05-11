import * as crypto from 'crypto';
import { IHashAlgorithm } from '..';

export class MD5 implements IHashAlgorithm {

    public calculate(str: string): string {
        const generator = crypto.createHash('md5');

        generator.update(str);

        return generator.digest('hex');
    }

}
