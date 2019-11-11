import request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpService, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CommentModule } from '../src/modules/comments/comment.module';
import { Comment } from '../src/modules/comments/comment.entity';
import { configServiceMock, httpServiceMock, repositoryMock } from './utils';
import { QueryFailedErrorFilter } from '../src/exceptions/query-failed.exception-filter';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Movie } from '../src/modules/movies/movie.entity';
import { MovieModule } from '../src/modules/movies/movie.module';
import { ConfigService } from '../src/modules/config/config.service';

const commentRepoMock = {...repositoryMock};
const movieRepoMock = {...repositoryMock};

describe('CommentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MovieModule, CommentModule],
    })
      .overrideProvider(ConfigService)
      .useValue(configServiceMock)
      .overrideProvider(HttpService)
      .useValue(httpServiceMock)
      .overrideProvider(getRepositoryToken(Comment))
      .useValue(commentRepoMock)
      .overrideProvider(getRepositoryToken(Movie))
      .useValue(movieRepoMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new QueryFailedErrorFilter());
    await app.init();
  });

  it('/GET /comments', (done) => {
    const result = [{ id: 'id_1', author: 'author_1', text: 'text_1'}];

    jest.spyOn(commentRepoMock, 'find')
      .mockImplementation(() => Promise.resolve(result));

    return request(app.getHttpServer())
      .get('/comments')
      .expect(200)
      .expect(result, done);
  });

  it('/POST /comments', (done) => {
    const commentDto = {author: 'author_1', text: 'text_1'};
    const result = {...commentDto, id: 'id_1'};

    jest.spyOn(movieRepoMock, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(commentRepoMock, 'create')
      .mockImplementation(() => Promise.resolve(result));
    jest.spyOn(commentRepoMock, 'insert')
      .mockImplementation(() => Promise.resolve());

    return request(app.getHttpServer())
      .post('/comments')
      .send(commentDto)
      .expect(201)
      .expect(result, done);
  });

  it('/POST /comments with wrong param', (done) => {
    const commentDto = {author: 'author_1', text: 'text_1'};

    jest.spyOn(movieRepoMock, 'findOneOrFail')
      .mockImplementation(() => {throw new EntityNotFoundError('Comment', {})});

    return request(app.getHttpServer())
      .post('/comments')
      .send(commentDto)
      .expect(400)
      .expect({message: 'Could not find any entity of type "Comment" matching: {}'}, done);
  });
});
