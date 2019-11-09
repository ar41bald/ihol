import { Repository } from 'typeorm';

import { OmdbService } from './omdb.service';
import { Movie } from '../movie.entity';
import { MovieService } from './movie.service';

const repositoryMock = {
  create: () => Promise.resolve(),
  insert: () => Promise.resolve(),
  find: () => Promise.resolve(),
} as Repository<Movie>;
const omdbServiceMock = {
  fetchMovieInfo: () => Promise.resolve(),
} as OmdbService;

describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(() => {
    movieService = new MovieService(repositoryMock, omdbServiceMock);
  });

  describe('create', () => {
    it('should return created movie entity', async () => {
      const movieDto = { imdbID: 'id_1', Title: 'Title_1'};

      jest.spyOn(omdbServiceMock, 'fetchMovieInfo').mockImplementation(() => Promise.resolve(movieDto));
      jest.spyOn(repositoryMock, 'create').mockImplementation(() => Promise.resolve(movieDto));

      expect(await movieService.create({})).toEqual(movieDto);

    });

    it('should pass params correctly', async () => {
      const movieDto = { imdbID: 'id_1', Title: 'Title_1', director: 'Director_1'};
      const movieEntity = { imdbID: 'id_1', Title: 'Title_1'};
      const params = {i: 'id_1'};

      const fetchMovieInfoSpy = jest.spyOn(omdbServiceMock, 'fetchMovieInfo')
        .mockImplementation(() => Promise.resolve(movieDto));
      const createEntitySpy = jest.spyOn(repositoryMock, 'create')
        .mockImplementation(() => Promise.resolve(movieEntity));
      const insertEntitySpy = jest.spyOn(repositoryMock, 'insert');

      await movieService.create(params);

      expect(fetchMovieInfoSpy).toHaveBeenCalledWith(params);
      expect(createEntitySpy).toHaveBeenCalledWith(movieDto);
      expect(insertEntitySpy).toHaveBeenCalledWith(movieEntity);
    });
  });

  describe('findAll', () => {
    it('should return created movie entity', async () => {
      const result = [{ imdbID: 'id_1', Title: 'Title_1'}, { imdbID: 'id_2', Title: 'Title_2'}];

      jest.spyOn(repositoryMock, 'find').mockImplementation(() => Promise.resolve(result));

      expect(await movieService.findAll()).toEqual(result.concat([]));
    });
  });
});
