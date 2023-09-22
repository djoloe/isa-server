import { RemoveReservationRepository } from "../repository/removeReservationRepository";
export class RemoveReservationService {

    private removeResRepo = new RemoveReservationRepository();

    public constructor(){

    }

    public async passID(idUser: number) {
        const isDeleted = await this.removeResRepo.removeSeatsDB(idUser);
        return isDeleted;
    }

}