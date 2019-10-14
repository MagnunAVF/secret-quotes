'use strict';

const _ = require('lodash');
const fs = require('fs');

module.exports.getRandomSecretKey = () => {
    const secretsHash = getSecretsHash();
    const possibleKeys = _.keys(secretsHash);

    return _.sample(possibleKeys);
}

module.exports.getSecret = (secretKey) => {
    const secretsHash = getSecretsHash();
    const possibleKeys = _.keys(secretsHash);

    if (!possibleKeys.includes(secretKey)) {
        const message = `Key ${secretKey} not exists!`;
        console.log(message);
        throw new Error(message);
    }

    return secretsHash[secretKey];
}

module.exports.getPossibleKids = () => {
    return _.keys(getSecretsHash());
}

const getSecretsHash = () => {
    const secretsFile = fs.readFileSync('secrets.json');

    return JSON.parse(secretsFile);
}