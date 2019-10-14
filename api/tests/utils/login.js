'use strict';

const mod = require('../../src/routes/login');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'handler' });

module.exports.login = (email, password) => {
    const event = {
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: { "Content-Type": "application/json" }
    };

    return wrapped.run(event).then((response) => {
        return JSON.parse(response.body);
    });
}