'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const awsHelper = require('../utils/aws');
const jwtHelper = require('../utils/jwt');

const HEADER_VALIDATION_ERROR_MESSAGE = 'User jwt token and secret key identifier must be present in header!';

module.exports.handler = (event, context, callback) => {
    const receivedHeader = event.headers;
    const jwtToken = receivedHeader.Authorization;
    const secretKid = receivedHeader.kid;
    let secret = '';

    try {
        if (!jwtToken || !secretKid) {
            console.log(HEADER_VALIDATION_ERROR_MESSAGE);
            throw new Error(HEADER_VALIDATION_ERROR_MESSAGE);
        };

        secret = jwtHelper.getSecret(secretKid);

        const decodedToken = jwt.verify(jwtToken, secret);
        const user = decodedToken.user;

        // generate IAMPolicy
        const effect = 'Allow';
        const userId = user.email;
        const authorizerContext = { user: JSON.stringify(user) };
        const policyDocument = awsHelper.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

        callback(null, policyDocument);
    } catch (error) {
        console.log(error.message);
        callback('Unauthorized');
    }
};
