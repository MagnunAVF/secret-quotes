'use strict';

const jwt = require('jsonwebtoken');
const usersService = require('../services/users');
const jwtHelper = require('../utils/jwt');
const response = require('../utils/response');

const JWT_EXPIRATION_TIME = '10m';
const BODY_VALIDATION_ERROR_MESSAGE = 'User email and password must be present!';

module.exports.handler = async (event, context, callback) => {
    console.log('Login route');

    const receivedBody = JSON.parse(event.body);

    const email = receivedBody.email;
    const password = receivedBody.password;

    try {
        // validate post request body
        if (!email || !password) {
            console.log(BODY_VALIDATION_ERROR_MESSAGE);
            throw new Error(BODY_VALIDATION_ERROR_MESSAGE);
        };

        // authenticate user
        const user = usersService.login(email, password);
        console.log(`User ${user.name} requesting token.`);

        // generate jwt
        const kid = jwtHelper.getRandomSecretKey();
        const secret = jwtHelper.getSecret(kid);
        const generatedJwtToken = jwt.sign({ user }, secret, { expiresIn: JWT_EXPIRATION_TIME });

        const body = {
            token: generatedJwtToken,
            kid: kid
        }

        callback(null, response.build(200, body));
    } catch (error) {
        let statusCode = 401;
        if (error.message === BODY_VALIDATION_ERROR_MESSAGE) {
            statusCode = 400;
        }

        const body = { error: error.message };

        callback(null, response.build(statusCode, body));
    };
};
