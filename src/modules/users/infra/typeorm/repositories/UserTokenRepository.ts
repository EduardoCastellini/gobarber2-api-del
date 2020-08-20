import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async generate(): Promise<UserToken> {}
}

export default UserTokenRepository;
