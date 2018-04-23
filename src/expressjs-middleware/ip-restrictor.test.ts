import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ExpressJSIPRestrictor } from './ip-restrictor';

describe('ExpressJSIPRestrictor', () => {

    describe('allow', () => {

        it('should call next given allowed IP Address', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').allow().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '127.0.0.1';
                },
            }, null, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.true;

        });

        it('should call next given multiple allowed IP Addresses', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').allow().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '127.0.0.1, 10.0.0.1, 192.168.1.1';
                },
            }, null, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.true;

        });

        it('should not call next given not allowed IP Address', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').allow().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '10.0.0.1';
                },
            }, {
                    status: (status: number) => {
                        return {
                            end: () => {

                            },
                        };
                    },
                }, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.false;

        });

    });

    describe('deny', () => {

        it('should not call next given denied IP Address', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').deny().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '127.0.0.1';
                },
            }, {
                status: (status: number) => {
                    return {
                        end: () => {

                        },
                    };
                },
            }, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.false;

        });

        it('should not call next given multiple denied IP Addresses', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').deny().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '127.0.0.1, 10.0.0.1, 192.168.1.1';
                },
            }, {
                status: (status: number) => {
                    return {
                        end: () => {

                        },
                    };
                },
            }, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.false;

        });

        it('should call next given not denied IP Address', async () => {

            const fn: (request, response, next) => void = new ExpressJSIPRestrictor().addIPAddress('127.0.0.1').deny().build();

            const nextFnSpy: sinon.SinonSpy = sinon.spy();

            fn({
                get: (name: string) => {
                    return '10.0.0.1';
                },
            }, null, nextFnSpy);

            expect(nextFnSpy.calledOnce).to.be.true;

        });

    });

});
