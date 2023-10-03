/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export class TokenService {
  public constructor() {}

  public createToken(email: string, password: string, idUser: number) {
    const token = jwt.sign(
      {
        email: email,
        password: password,
        idUser: idUser,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );
    return token;
  }

  public checkToken(tokenWeb: any): any {
    try {
      jwt.verify(tokenWeb, process.env.JWT_SECRET as string, function (err: any, res: any) {
        if (err) throw err;
      });
    } catch (error) {
      return false;
    }
  }
}
