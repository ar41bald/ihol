import 'reflect-metadata';
import { Repository } from 'typeorm';

import { CommentService } from './comment.service';
import { Movie } from '../../movies/movie.entity';

const commentRepoMock = {
  create: () => Promise.resolve(),
  insert: () => Promise.resolve(),
  find: () => Promise.resolve(),
} as undefined as Repository<Comment>;
const movieRepoMock = {
  findOneOrFail: () => Promise.resolve(),
} as undefined as Repository<Movie>;

describe('CommentService', () => {
  let commentService: CommentService;

  beforeEach(() => {
    commentService = new CommentService(commentRepoMock, movieRepoMock);
    jest.spyOn(movieRepoMock, 'findOneOrFail').mockClear();
    jest.spyOn(commentRepoMock, 'create').mockClear();
    jest.spyOn(commentRepoMock, 'insert').mockClear();
  });

  describe('create', () => {
    it('should return created comment entity', async () => {
      const commentDto = {author: 'User 1', text: 'text_1', movie: 'id_1'};
      const commentEntity = {...commentDto, id: '1'};

      jest.spyOn(movieRepoMock, 'findOneOrFail').mockImplementation(() => Promise.resolve());
      jest.spyOn(commentRepoMock, 'create').mockImplementation(() => Promise.resolve(commentEntity));

      expect(await commentService.create(commentDto)).toEqual(commentEntity);
    });

    it('should pass params correctly', async () => {
      const commentDto = {author: 'User 1', text: 'text_1', movie: 'id_1'};
      const commentEntity = {...commentDto, id: '1'};

      jest.spyOn(movieRepoMock, 'findOneOrFail').mockImplementation(() => Promise.resolve());
      const createEntitySpy = jest.spyOn(commentRepoMock, 'create')
        .mockImplementation(() => Promise.resolve(commentEntity));
      const insertEntitySpy = jest.spyOn(commentRepoMock, 'insert');

      await commentService.create(commentDto);

      expect(createEntitySpy).toBeCalledWith(commentDto);
      expect(insertEntitySpy).toBeCalledWith(commentEntity);
    });

    it('should not save entity if param is wrong', async () => {
      const commentDto = {author: 'User 1', text: 'text_1', movie: 'id_1'};
      const errorMessage = 'Entity not found';

      jest.spyOn(movieRepoMock, 'findOneOrFail').mockImplementation(() => {throw Error(errorMessage)});
      const createEntitySpy = jest.spyOn(commentRepoMock, 'create');
      const insertEntitySpy = jest.spyOn(commentRepoMock, 'insert');

      try {
        await commentService.create(commentDto);
      } catch (e) {
        expect(e.message).toBe(errorMessage);
      } finally {
        expect(createEntitySpy).not.toBeCalled();
        expect(insertEntitySpy).not.toBeCalled();
      }
    });
  });

  describe('findAll', () => {
    it('should return created comment entity', async () => {
      const result = [
        {author: 'User 1', text: 'text_1', movie: 'id_1'},
        {author: 'User 2', text: 'text_2', movie: 'id_2'},
      ];

      jest.spyOn(commentRepoMock, 'find').mockImplementation(() => Promise.resolve(result));

      expect(await commentService.findAll()).toEqual(result);
    });
  });
});
