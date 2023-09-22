import { parse } from "path";
import { ChooseSeatRepository } from "../repository/chooseSeatRepository";
import { SeatInfo } from "./classObject/seatInfo";

export class ChooseSeatService {
    
    private chooseSeatRepo = new ChooseSeatRepository();

    public constructor(){

    }

    public async parseSeats(data: Object){
        const parsedReq = JSON.parse(JSON.stringify(data));
        const seatsInfo = new SeatInfo(parsedReq.array, parsedReq.idUser, parsedReq.idFlight);
        const saved = await this.chooseSeatRepo.populateSeats(seatsInfo);
        return saved;
    }

}