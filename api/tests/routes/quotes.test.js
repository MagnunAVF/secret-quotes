'use strict';

const mod = require('../../src/routes/quotes');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'getQuote' });

describe('getQuote', () => {
    beforeAll((done) => {
        done();
    });

    it('Should return a random quote', () => {
        return wrapped.run({}).then((response) => {
            expect(response).toBeDefined();
            expect(response.body).toHaveProperty('quote');
            expect(typeof response.body.quote).toBe('string');
        });
    });

    it('Should return 200 status code', () => {
        return wrapped.run({}).then((response) => {
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(200);
        });
    });

    it('Should contain cors Access-Control-Allow-Origin header in response', () => {
        return wrapped.run({}).then((response) => {
            expect(response).toBeDefined();
            expect(response.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
        });
    });
});
