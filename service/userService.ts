/* eslint-disable prefer-const */
import { UserRepository } from '../repository/userRepository';
import { TokenService } from './tokenService';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: '/.env' });

export class UserService {
  private tokenServiceObj = new TokenService();
  private readonly saltRounds = 3;
  private userRepoObj = new UserRepository();

  public constructor() {}

  public async checkUserForLogin(email: string, password: string) {
    const objectBase = await this.userRepoObj.getUserForLogin(email);
    if (objectBase) {
      return new Promise((resolve) => {
        bcrypt.compare(password, String(objectBase.passwordBase), (err, result) => {
          if (err) throw err;
          if (result) {
            const tokenService = this.tokenServiceObj.createToken(email, objectBase.passwordBase, objectBase.idBase);
            resolve(tokenService);
          } else {
            resolve(false);
          }
        });
      });
    }
  }

  public hashPassword(body: object) {
    const data = JSON.stringify(body);
    const parsed = JSON.parse(data);
    bcrypt
      .hash(parsed.password, this.saltRounds)
      .then((hash) => {
        this.userRepoObj.saveUser(parsed, hash);
      })
      .catch(() => {
        console.log('err -> hashPassword');
      });
  }

  public async checkEmail(email: string): Promise<boolean> {
    let sameEmail: boolean;
    sameEmail = await this.userRepoObj.checkEmail(email);
    return sameEmail;
  }
}
