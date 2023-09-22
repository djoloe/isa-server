import { SeatInfo } from "../service/classObject/seatInfo";
import { ConnectionDB } from "./connectionDB";
export class ChooseSeatRepository{

    connection = new ConnectionDB().openConnection();

    public constructor(){

    }

    public populateSeats(data: SeatInfo){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO avioschedule.seats (seat, idUser, idFlight) VALUES (?,?,?)`
            this.connection.query(sql, [JSON.stringify(data.divs),data.idUser,data.idFlight] , function(err,result) {
                if(err) throw (err);
                if(result){
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }

}