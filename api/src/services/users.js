'use strict';

const _ = require('lodash');
const mock = require('../utils/mocks/users');

module.exports.login = (email, password) => {
    const user = _.find(mock.USERS, { email });

    if (!user) {
        throw new Error(`User with email ${email} Not Found!`);
    }

    const passwordIsValid = (password === user.password);

    if (!passwordIsValid) {
        throw new Error('Invalid Password!');
    }

    return _.omit(user, 'password');
};
