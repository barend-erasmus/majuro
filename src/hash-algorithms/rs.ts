import { IHashAlgorithm } from '..';

export class RS implements IHashAlgorithm {

    public calculate(str: string): string {
        let a: number = 0xF8C9;
        const b: number = 0x5C6B7;

        let h: number = 0;

        for (let i = 0, l = str.length; i < l; i++) {
            h = h * a + str.charCodeAt(i);
            a *= b;
        }

        return h.toString(16);
    }

}
