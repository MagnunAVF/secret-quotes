'use strict';

const faker = require('faker');
const response = require('../utils/response');

module.exports.getQuote = async (event, context, callback) => {
    console.log('Generating random secret quote ...');

    const randomQuote = `SECRET: ${faker.lorem.sentence()}`;
    console.log(`returning generated secret quote: ${randomQuote}`)

    const body = {
        quote: randomQuote
    };

    callback(null, response.build(200, body));
};