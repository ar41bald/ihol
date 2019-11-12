# IHOL

## Description
In Honor of Lumiere :)

Test app for keeping movies information

## Running the app (production version)

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --force-recreate
```

## Running the app (development version)

```bash
# run docker container with the database
$ docker-compose -p ihol up --force-recreate -d
$ npm i
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

