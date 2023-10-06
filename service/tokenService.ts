/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export class TokenService {
  public constructor() {}

  public createToken(idUser: number, role: string) {
    const token = jwt.sign(
      {
        idUser: idUser,
        role: role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );
    return token;
  }

  public checkToken(tokenWeb: any): Promise<any> {
    return new Promise((response) => {
      try {
        jwt.verify(tokenWeb, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
          if (err) throw err;
          if (decoded) {
            const data = {
              role: decoded.role,
              idUser: decoded.idUser,
            };

            response(data);
          }
        });
      } catch (error) {
        response(false);
      }
    });
  }

  public decodeToken(token: any) {
    return jwt.decode(token);
  }
}
