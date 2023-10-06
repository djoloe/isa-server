import { JwtPayload } from 'jsonwebtoken';
import { SeatRepository } from '../repository/seatRepository';
import { SeatInfo } from './classObject/seatInfo';
import { TokenService } from './tokenService';
export class SeatService {
  private seatRepoObj = new SeatRepository();
  private tokenServiceObj = new TokenService();
  public constructor() {}

  public async parseSeats(data: object) {
    const parsedReq = JSON.parse(JSON.stringify(data));
    const tokenBase = this.tokenServiceObj.decodeToken(parsedReq.token);
    const seatsInfo = new SeatInfo(parsedReq.array, (tokenBase as JwtPayload).idUser, parsedReq.idFlight);
    const saved = await this.seatRepoObj.populateSeats(seatsInfo);
    return saved;
  }

  public async passToken(token: any) {
    const tokenBase = this.tokenServiceObj.decodeToken(token);
    const isDeleted = await this.seatRepoObj.removeSeatsDB((tokenBase as JwtPayload).idUser);
    return isDeleted;
  }

  public async checkFlightDivDB(idFlight: number) {
    const divFlight = await this.seatRepoObj.checkSeats(idFlight);
    return divFlight;
  }
}
