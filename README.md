## Description

Consolidate all the knowledge from all your newsletters in one place.
Get nice and clean summaries of the most important information from the newsletters you are subscribed to and read it through the Notion.
No more spam in your inbox, single _technical_ inbox for all the newsletters you are subscribed to.

## Installation

App use [Nylas API](https://developer.nylas.com/) to grab emails data, so you need to first create account and fill the .env file and provide the following variables:

```bash
NYLAS_CLIENT_ID=
NYLAS_API_KEY=
NYLAS_WEBHOOK_SECRET=
```

Tutorial how to create api keys -> https://developer.nylas.com/docs/v3/auth/hosted-oauth-apikey/

Use Node v20

```bash
$ nvm use
```

Install dependencies

```bash
$ npm ci
```

## Running the app

```bash
# watch mode
$ npm run prisma:migrate && npm run start:dev
```

To test the app you should create temporary email account.
After that you will need to visit `http://localhost:3000/nylas/auth` to authenticate with Nylas API and allow app to read your emails.
Once that is done, you have to setup the webhook to get the emails data. Here are docs how to do it -> https://developer.nylas.com/docs/v3/webhooks/

Note:
There is a script which creates tunnel to localhost, so you can test the webhook locally. To do that you need to run the following command:

```bash
$ npm run create:tunnel
```

## Unit Tests

````bash
# unit tests
$ npm run test:unit


## Integration Tests

Before running tests you need to setup SQLite database

```bash
$ npm run prisma:migrate:integration
````

## Stay in touch

- Author - [Olgierd Liberski](https://www.linkedin.com/in/olgierd-liberski-980203159/)

## License

Nest is [MIT licensed](LICENSE).

## Notes

The project is currently under development, and the main features have not yet been implemented. This project has been designed for personal use. The selected tech stack is primarily utilized for educational purposes.
