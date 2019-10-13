'use strict';

const _ = require('lodash');
const mod = require('../../src/routes/login');
const jwt = require('jsonwebtoken');
const jwtHelper = require('../../src/utils/jwt');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'handler' });

const BODY_VALIDATION_ERROR_MESSAGE = 'User email and password must be present!';
const USER_NOT_FOUND_MESSAGE_END = "Not Found!";
const INVALID_PASSWORD_MESSAGE = "Invalid Password!";

describe('login', () => {
    beforeAll((done) => {
        done();
    });

    it('Should contain cors Access-Control-Allow-Origin header in response', () => {
        const event = {
            body: JSON.stringify({
                email: "admin@mail.com",
                password: "admin"
            }),
            headers: { "Content-Type": "application/json" }
        };

        return wrapped.run(event).then((response) => {
            expect(response).toBeDefined();
            expect(response.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
        });
    });

    describe('when login WITHOUT user email', () => {
        const event = {
            body: JSON.stringify({
                password: "admin"
            }),
            headers: { "Content-Type": "application/json" }
        };

        it('Should return a correct error message', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(body).toHaveProperty('error', BODY_VALIDATION_ERROR_MESSAGE);
                expect(typeof body.error).toBe('string');
            });
        });

        it('Should return 400 status code', () => {
            return wrapped.run(event).then((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(400);
            });
        });
    });

    describe('when login WITHOUT user password', () => {
        const event = {
            body: JSON.stringify({
                email: "admin@mail.com",
            }),
            headers: { "Content-Type": "application/json" }
        };

        it('Should return a correct error message', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(body).toHaveProperty('error', BODY_VALIDATION_ERROR_MESSAGE);
                expect(typeof body.error).toBe('string');
            });
        });

        it('Should return 400 status code', () => {
            return wrapped.run(event).then((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(400);
            });
        });
    });

    describe('when login with a NOT existing user', () => {
        const event = {
            body: JSON.stringify({
                email: "admin999@mail.com",
                password: "admin"
            }),
            headers: { "Content-Type": "application/json" }
        };

        it('Should return a correct error message', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(_.endsWith(body.error, USER_NOT_FOUND_MESSAGE_END)).toBe(true);
                expect(typeof body.error).toBe('string');
            });
        });

        it('Should return 404 status code', () => {
            return wrapped.run(event).then((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(404);
            });
        });
    });

    describe('when login with a NOT valid password', () => {
        const event = {
            body: JSON.stringify({
                email: "admin@mail.com",
                password: "wrong-password"
            }),
            headers: { "Content-Type": "application/json" }
        };

        it('Should return a correct error message', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(body).toHaveProperty('error', INVALID_PASSWORD_MESSAGE);
                expect(typeof body.error).toBe('string');
            });
        });

        it('Should return 401 status code', () => {
            return wrapped.run(event).then((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(401);
            });
        });
    });

    describe('when login with valid infos', () => {
        const event = {
            body: JSON.stringify({
                email: "admin@mail.com",
                password: "admin"
            }),
            headers: { "Content-Type": "application/json" }
        };

        it('Should return a valid kid(secret key identifier) value', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(body).toHaveProperty('kid');
                expect(typeof body.kid).toBe('string');
                expect(jwtHelper.getPossibleKids()).toContain(body.kid);
            });
        });

        it('Should return a valid jwt', () => {
            return wrapped.run(event).then((response) => {
                const body = JSON.parse(response.body);

                expect(response).toBeDefined();
                expect(body).toHaveProperty('token');
                expect(typeof body.token).toBe('string');
                expect(() => {
                    jwt.verify(body.token, jwtHelper.getSecret(body.kid))
                }).not.toThrowError(jwt.JsonWebTokenError);
            });
        });

        it('Should return 200 status code', () => {
            return wrapped.run(event).then((response) => {
                expect(response).toBeDefined();
                expect(response.statusCode).toBe(200);
            });
        });
    });
});
