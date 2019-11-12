# IHOL

## Description
In Honor of Lumiere :)

Test app for keeping movies information

Running on [Heroku](https://ihol-app.herokuapp.com)

## Using
```bash
# Add movie. 'i' (imdbID) or 't' (title) param is required
$ curl --data "t=8 Mile" https://ihol-app.herokuapp.com/movies -i
# Get all movies
$ curl https://ihol-app.herokuapp.com/movies -i

# Add comment. Check that movieImdbID param contains movie id of the existing object
$ curl --data "author=Greg&text=Simple text&movieImdbID=tt0298203" https://ihol-app.herokuapp.com/comments -i
# Get all comments
$ curl https://ihol-app.herokuapp.com/comments -i
```

## Running the app (production version)

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --force-recreate
# application will be available on port 3000
```

## Running the app (development version)

```bash
# run docker container with the database
$ docker-compose -p ihol up --force-recreate -d
$ npm i
$ npm run start:dev
# application will be available on port 3000
```

## Using locally 
```bash
# Add movie. 'i' or 't' param
$ curl --data "t=8 Mile" http://0.0.0.0:3000/movies -i
# Get all movies
$ curl http://0.0.0.0:3000/movies -i

# Add comment. Check that movieImdbID param contains movie id of the existing object
$ curl --data "author=Greg&text=Simple text&movieImdbID=tt0298203" http://0.0.0.0:3000/comments -i
# Get all comments
$ curl http://0.0.0.0:3000/comments -i 
```

You can play with the wrong API parameters to see how application will handle it.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Additional feature:
- exception catching layer
- data transformation layer
- API parameters validation
- environment variables management
