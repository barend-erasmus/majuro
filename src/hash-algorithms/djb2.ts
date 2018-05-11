import { IHashAlgorithm } from '..';

export class DJBD2 implements IHashAlgorithm {

    public calculate(str: string): string {
        let h: number = 0x1505;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h = ((h << 5) + h) + str.charCodeAt(i);
        }

        return h.toString(16);
    }

}
