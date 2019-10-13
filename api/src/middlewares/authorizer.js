'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const awsHelper = require('../utils/aws');
const jwtHelper = require('../utils/jwt');

module.exports.handler = (event, context, callback) => {
    const jwtToken = event.headers.Authorization;
    const secretKid = event.headers.kid;
    let secret = '';

    try {
        secret = jwtHelper.getSecret(secretKid);
    } catch (error) {
        console.log(error);
        callback('Unauthorized');
    }

    try {
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
