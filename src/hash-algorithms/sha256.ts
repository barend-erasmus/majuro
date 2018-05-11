import * as crypto from 'crypto';
import { IHashAlgorithm } from '..';

export class SHA256 implements IHashAlgorithm {

    public calculate(str: string): string {
        const generator = crypto.createHash('sha256');

        generator.update(str);

        return generator.digest('hex');
    }

}
