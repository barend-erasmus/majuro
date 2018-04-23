import { Majuro } from '../majuro';

export class ExpressJSIPRestrictor {

    protected ipAddresses: string[] = null;

    protected ipAddressHeaders: string[] = [
        'x-client-ip',
        'x-forwarded-for',
        'x-real-ip',
    ];

    protected mode: string = null;

    constructor() {
        this.ipAddresses = [];
    }

    public addIPAddress(ipAddress: string): ExpressJSIPRestrictor {
        Majuro.getDefaultLoggerForRuntime().log(`addIPAddress('${ipAddress}')`, {
            class: 'ExpressJSIPRestrictor',
            method: 'addIPAddress',
            namespace: 'expressjs-middleware',
            parameters: {
                ipAddress,
            },
        });

        this.ipAddresses.push(ipAddress);

        return this;
    }

    public allow(): ExpressJSIPRestrictor {
        Majuro.getDefaultLoggerForRuntime().log(`allow()`, {
            class: 'ExpressJSIPRestrictor',
            method: 'allow',
            namespace: 'expressjs-middleware',
            parameters: {
            },
        });

        this.mode = 'allow';

        return this;
    }

    public build(): (request, response, next) => void {
        Majuro.getDefaultLoggerForRuntime().log(`build()`, {
            class: 'ExpressJSIPRestrictor',
            method: 'build',
            namespace: 'expressjs-middleware',
            parameters: {
            },
        });

        return (request, response, next) => {
            let ipAddress: string = null;

            for (const header of this.ipAddressHeaders) {
                ipAddress = request.get(header);

                if (ipAddress) {
                    break;
                }
            }

            ipAddress = ipAddress.split(',')[0].trim();

            if (this.mode === 'allow') {
                if (this.ipAddresses.indexOf(ipAddress) > -1) {
                    next();
                    return;
                }
            }

            if (this.mode === 'deny') {
                if (this.ipAddresses.indexOf(ipAddress) === -1) {
                    next();
                    return;
                }
            }

            response.status(403).end();
        };
    }

    public deny(): ExpressJSIPRestrictor {
        Majuro.getDefaultLoggerForRuntime().log(`deny()`, {
            class: 'ExpressJSIPRestrictor',
            method: 'deny',
            namespace: 'expressjs-middleware',
            parameters: {
            },
        });

        this.mode = 'deny';

        return this;
    }
}
