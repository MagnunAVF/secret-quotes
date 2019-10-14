# API
API general notes.

## Routes
| Route | Description | Requirements  |
|---|---|---|
| GET /quote | Return a random quote | none |
| GET /secret-quote | Return a random secret quote | A valid Authorization and kid request headers|
| POST /login | Login a user and return jwt token and secret key identifier| A request body with valid user email and password|

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```diff
- ATTENTION! This API only works with node 10 versions. Take care with node version that are you running, this can cause a lot of errors.
```

## Prerequisites

A node 10 environment and Java Runtime Engine (JRE) version 6.x or newer.

To install node you can use nvm. For more details access [nvm](https://github.com/nvm-sh/nvm).

Then, you need to install node version 10. Run in terminal:
```
nvm install 10
```
Finally, you need serverless package installed globally.
To install serverless, after install node, run in terminal:
```
nvm use 10
```
To use correct node version and then run:
```
npm i -g serverless
```

## Installing

Before you install , you need to set your ~/.aws/credentials file in your machine:
```
[serverless-deploy]
aws_access_key_id = set deploy AWS key id !
aws_secret_access_key = set deploy default AWS access key !
region= Set deploy region !
output=json
```

```diff
- ATTENTION! The profile must contain correct permissions that serverless needs.
```
For more details about serverless permissions access [Serverless IAM Guide](https://serverless.com/framework/docs/providers/aws/guide/iam/).

After clone, run in terminal (to local development):
```
npm install
```

Then, you need to create a secrets.json file based on secrets.sample.json.

## Local development
After install, to run in localhost:
```
serverless offline start
```
You can use --noTimeout flag to avoid timeouts.

## Tests
After install, you can run tests with:
```
npm run test
```
To run tests with coverage, run:
```
npm run test:cov
```
To run develop with TDD, run:
```
npm run test:watch
```

## Styleguide
Based on airbnb.

## Deployment
To deploy, you need to have ~/.aws/credentials file set up.

To deploy in an environment, run:
```
serverless deploy --aws-profile server --stage development
```

To deploy, run (specify the ENVIRONMENT):
```
serverless deploy --aws-profile serverless-deploy --stage ENVIRONMENT
```

To remove/delete all deployed stack, run(specify the ENVIRONMENT):
```
serverless remove --aws-profile serverless-deploy --stage ENVIRONMENT
```
```diff
- ATTENTION! This command will destroy all deployed resources!
```
