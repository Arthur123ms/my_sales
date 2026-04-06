import AppError from 'src/shared/errors/appError';
import { ICreateUser } from '../domain/models/ICreateUser';
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories';
import { User } from '../infra/database/entities/Users';
import CreateSessionsService from './CreateSessionService';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-token'),
}));

const mockUserData: User[] = [
  {
    id: '1',
    name: 'Jhon Doe',
    email: 'jhondoe@gmail.com',
    password: 'hashed-password',
    created_at: new Date(),
    update_at: new Date(),
    getAvatarUrl() {
      return 'avatar.jpg';
    },
  } as User,
];

let fakeUserRepositories: FakeUserRepositories;
let createSessionService: CreateSessionsService;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories();
    createSessionService = new CreateSessionsService(fakeUserRepositories);
  });

  it('should be able to authenticate with valid credontials', async () => {
    const user = { ...mockUserData[0] };
    const { email, password } = user as { email: string; password: string };

    await fakeUserRepositories.create(user as ICreateUser);

    (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(true);

    const response = await createSessionService.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toBe(email);
  });

  it('should not be able to authenticate with non-existing user', async () => {
    await expect(
      createSessionService.execute({
        email: 'noneexisting@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should non a be able to authenticate with wrong password', async () => {
    const user = { ...mockUserData[0] };
    const email = user.email!;

    await fakeUserRepositories.create(user as ICreateUser);

    (require('bcrypt').hash as jest.Mock).mockRejectedValue('hashed-password');
    (require('bcrypt').compare as jest.Mock).mockResolvedValue(false);

    await expect(
      createSessionService.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
