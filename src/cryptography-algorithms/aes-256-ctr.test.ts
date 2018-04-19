import { expect } from 'chai';
import 'mocha';
import { AES256CTRCryptographyAlgorithm } from '..';

describe('AES256CTRCryptographyAlgorithm', () => {

    let cryptographyAlgorithm: AES256CTRCryptographyAlgorithm = null;

    before(async () => {
        cryptographyAlgorithm = new AES256CTRCryptographyAlgorithm('password');
    });

    describe('decrypt', () => {

        it('should return decrypted string', async () => {

            const result: string = cryptographyAlgorithm.decrypt('f8c9d08f9e923824fd9aad');

            expect(result).to.be.eq('hello world');

        });

    });

    describe('encrypt', () => {

        it('should return encrypted string', async () => {

            const result: string = cryptographyAlgorithm.encrypt('hello world');

            expect(result).to.be.eq('f8c9d08f9e923824fd9aad');

        });

    });

});
