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

  public checkToken(tokenWeb: any): Promise<any> {
    return new Promise((response) => {
      try {
        jwt.verify(tokenWeb, process.env.JWT_SECRET as string, function (err: any, decoded: any) {
          if (err) throw err;
          if (decoded) {
            response(decoded);
          }
        });
      } catch (error) {
        response(false);
      }
    });
  }
}
