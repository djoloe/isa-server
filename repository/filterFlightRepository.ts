import { resolve } from "path";
import { ConnectionDB } from "./connectionDB";
import { Flight } from "../service/classObject/flight";
import { query } from "express";

export class FilterFlightRepository { 

    private connection = new ConnectionDB().openConnection();

    public constructor() {

    }

    public async filterFlight(classTrip: string, fromPlace: string, toPlace: string, departDate: string, returnDate: string){
        return await new Promise((resolve,reject) => {
            let flightsArray:Array<Flight> = [];
            const sql = 'SELECT * FROM avioschedule.flight WHERE classTrip = ? AND fromPlace = ? AND toPlace = ? AND departDate = ? AND returnDate = ?';
            this.connection.query(sql, [[classTrip],[fromPlace],[toPlace],[departDate],[returnDate]],  function(err,result){
                if(err) throw err;
                if(result.length > 0){
                        for(let i = 0; i < result.length; i++){
                            let flight = new Flight(result[0].idflight, result[0].departDate, result[0].returnDate, result[0].timeTravel, result[0].classTrip, result[0].stops, result[0].price, result[0].fromPlace, result[0].toPlace,result[0].idavioCompany);
                            flightsArray.push(flight);
                        }
                        resolve(flightsArray);
                } else {
                    resolve(204);
                }
            });
        })

     }
    
}