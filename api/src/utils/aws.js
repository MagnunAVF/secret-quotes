'use strict';

module.exports.buildIAMPolicy = (userId, effect, resource, context) => {
    console.log(`building IAMPolicy to user ${userId} in resource ${resource}`);
    console.log(`user is permitted: ${effect} in resource ${resource}`);

    const policy = {
        principalId: userId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context,
    };

    return policy;
};
