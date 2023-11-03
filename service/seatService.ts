import { JwtPayload } from 'jsonwebtoken';
import { SeatRepository } from '../repository/seatRepository';
import { SeatInfo } from './classObject/seatInfo';
import { TokenService } from './tokenService';
export class SeatService {
  private seatRepoObj = new SeatRepository();
  private tokenServiceObj = new TokenService();
  public constructor() {}

  public async parseSeats(data: object, headers: any) {
    const token = this.tokenServiceObj.decodeToken(headers);
    const parsedReq = JSON.parse(JSON.stringify(data));
    const seatsInfo = new SeatInfo(parsedReq.array, (token as JwtPayload).idUser, parsedReq.idFlight);
    const array = await this.seatRepoObj.checkSeats(parsedReq.idFlight);
    if (this.divExistInBase(array, parsedReq.array) === true) {
      console.log('div already taken');
      return;
    }
    const saved = await this.seatRepoObj.populateSeats(seatsInfo);
    return saved;
  }

  public async passToken(headers: any) {
    const tokenBase = this.tokenServiceObj.decodeToken(headers);
    const isDeleted = await this.seatRepoObj.removeSeatsDB((tokenBase as JwtPayload).idUser);
    return isDeleted;
  }

  public async checkFlightDivDB(idFlight: number, headers: any) {
    const token = this.tokenServiceObj.decodeToken(headers);
    const divFlight = await this.seatRepoObj.checkSeats(idFlight);
    const divsToken = {
      divs: divFlight,
      idUser: (token as JwtPayload).idUser,
    };
    return divsToken;
  }

  private divExistInBase(oldArray: any, newArray: any) {
    for (let i = 0; i < oldArray.length; i++) {
      for (let j = 0; j < newArray.length; j++) {
        if (oldArray[i].seat.includes(newArray[j])) return true;
      }
    }
  }
}
