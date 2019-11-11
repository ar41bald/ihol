import { of } from 'rxjs';

export const configServiceMock = {
  getDBConfig: () => {},
  getOMDbBaseUrl: () => {},
};
export const repositoryMock = {
  create: () => {},
  insert: () => {},
  find: () => {},
  findOneOrFail: () => {},
};
export const httpServiceMock = {
  get: () => of(),
};
