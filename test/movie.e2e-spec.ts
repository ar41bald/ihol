import request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpService, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';

import { MovieModule } from '../src/modules/movies/movie.module';
import { ConfigService } from '../src/modules/config/config.service';
import { Movie } from '../src/modules/movies/movie.entity';
import { configServiceMock, httpServiceMock, repositoryMock } from './utils';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MovieModule],
    })
      .overrideProvider(ConfigService)
      .useValue(configServiceMock)
      .overrideProvider(HttpService)
      .useValue(httpServiceMock)
      .overrideProvider(getRepositoryToken(Movie))
      .useValue(repositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET /movies', (done) => {
    const result = [{ imdbID: 'id_1', Title: 'TItle_1'}];

    jest.spyOn(repositoryMock, 'find')
      .mockImplementation(() => Promise.resolve(result));

    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(result, done);
  });

  it('/POST /movies', (done) => {
    const result = { imdbID: 'id_1', Title: 'TItle_1'};

    jest.spyOn(httpServiceMock, 'get')
      .mockImplementation(() => of({data: result}));
    jest.spyOn(repositoryMock, 'create')
      .mockImplementation(() => Promise.resolve(result));
    jest.spyOn(repositoryMock, 'insert')
      .mockImplementation(() => Promise.resolve());

    return request(app.getHttpServer())
      .post('/movies')
      .send({t: 'Title_1'})
      .expect(201)
      .expect(result, done);
  });
});
