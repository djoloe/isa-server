
import { ConnectionDB } from "./connectionDB";

export class RemoveReservationRepository{

    private connection = new ConnectionDB().openConnection();

    public constructor() {

    }

    public removeSeatsDB(idUser: number){
        return new Promise(async (resolve, reject) => {
            const sql = `DELETE FROM avioschedule.seats WHERE idUser = ?`
            await this.connection.query(sql, [idUser] , function(err,result) {
                if(err) throw (err);
                if(result){
                    resolve('true');
                }
            })
        })
    }
}