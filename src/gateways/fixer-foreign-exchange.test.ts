import { expect } from 'chai';
import 'mocha';
import { FixerForeignExchangeGateway } from '..';

describe('FixerForeignExchangeGateway', () => {

    let foreignExchangeGateway: FixerForeignExchangeGateway = null;

    beforeEach(async () => {
        foreignExchangeGateway = new FixerForeignExchangeGateway();
    });

    describe('convert', () => {

        it('should return value', async () => {

            const result: number = await foreignExchangeGateway.convert(10, 'ZAR', 'USD');

            expect(result).to.lt(10);

        });

    });

});
