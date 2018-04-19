import axios, { AxiosResponse } from 'axios';
import { IForeignExchangeGateway } from '../interfaces/foreign-exchange-gateway';
import { Majuro } from '../majuro';

export class FixerForeignExchangeGateway implements IForeignExchangeGateway {

    public async convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
        Majuro.getDefaultLoggerForRuntime().log(`convert(${amount}, ${fromCurrency}, ${toCurrency})`, {
            class: 'FixerForeignExchangeGateway',
            method: 'convert',
            namespace: 'gateways',
            parameters: {
                amount,
                fromCurrency,
                toCurrency,
            },
        });

        const response: AxiosResponse<any> = await axios({
            method: 'GET',
            url: `https://api.fixer.io/latest?base=${fromCurrency}`,
        });

        const rate: number = response.data.rates[toCurrency];

        return Math.round(amount * rate * 100) / 100;
    }

}
