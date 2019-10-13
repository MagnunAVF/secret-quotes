'use strict';

const faker = require('faker');


module.exports.getQuote = async (event, context, callback) => {
    console.log('Generating random quote ...');

    const randomQuote = faker.company.catchPhrase();
    console.log(`returning generated quote: ${randomQuote}`)

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: {
            quote: randomQuote
        },
    };

    callback(null, response);
};
