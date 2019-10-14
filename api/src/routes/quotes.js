'use strict';

const faker = require('faker');
const response = require('../utils/response');

module.exports.getQuote = async (event, context, callback) => {
    console.log('Generating random quote ...');

    const randomQuote = faker.company.catchPhrase();
    console.log(`returning generated quote: ${randomQuote}`)

    const body = {
        quote: randomQuote
    };

    callback(null, response.build(200, body));
};
