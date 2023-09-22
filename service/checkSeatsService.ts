import { CheckSeatRepository } from "../repository/checkSeatRepository";

export class CheckSeatsService {
    
    private checkSeatRepo = new CheckSeatRepository();

    public constructor(){

    }

    public async checkFlightDivDB(idFlight: number){
       const divFlight =  await this.checkSeatRepo.checkSeats(idFlight);
       return divFlight;
    }

}