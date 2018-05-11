import { IHashAlgorithm } from '..';

export class FNV1A implements IHashAlgorithm {

    public calculate(str: string): string {
        let h: number = 0x811c9dc5;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h ^= str.charCodeAt(i);
            // tslint:disable-next-line:no-bitwise
            h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
        }

        return h.toString(16);
    }

}
