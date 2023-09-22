import { ConnectionDB } from "./connectionDB";

export class CheckSeatRepository {

    private connection = new ConnectionDB().openConnection();

    public constructor(){

    }

    public async checkSeats(idFlight: number){
        return await new Promise((resolve,reject) => {
            let flightsArray:Array<string> = [];
            const sql = 'SELECT * FROM avioschedule.seats WHERE idFlight = ?';
            this.connection.query(sql, [idFlight] ,  function(err,result){
                if(err) throw err;
                if(result){
                       for(let i =0; i < result.length; i++){
                        flightsArray.push(result[i]);
                        resolve(flightsArray);
                       }
                } 
            });
        })
    }

}