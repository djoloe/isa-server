import { SeatRepository } from "../repository/seatRepository";
import { SeatInfo } from "./classObject/seatInfo";
export class SeatService {

    private seatRepoObj = new SeatRepository();

    public constructor() {

    }

    public async parseSeats(data: Object){
        const parsedReq = JSON.parse(JSON.stringify(data));
        const seatsInfo = new SeatInfo(parsedReq.array, parsedReq.idUser, parsedReq.idFlight);
        const saved = await this.seatRepoObj.populateSeats(seatsInfo);
        return saved;
    }

    public async passID(idUser: number) {
        const isDeleted = await this.seatRepoObj.removeSeatsDB(idUser);
        return isDeleted;
    }

    public async checkFlightDivDB(idFlight: number){
        const divFlight =  await this.seatRepoObj.checkSeats(idFlight);
        return divFlight;
     }
}