import { resolve } from "path";
import { ConnectionDB } from "./connectionDB";
import { AvioInfo } from "../service/classObject/avioInfo";

export class AvioRepository {

    private connection = new ConnectionDB().openConnection();
    public constructor(){

    }

    public filterAvio(id: number){
        return new Promise((resolve,reject) => {
            let avioSingleContent: AvioInfo;
            const sql = 'SELECT * FROM avioschedule.aviocompany WHERE idavioCompany = ?';
            this.connection.query(sql, [id],  function(err,result){
                if(err) throw err;
                if(result.length > 0){
                        for(let i = 0; i < result.length; i++){
                         avioSingleContent = new AvioInfo(result[0].idavioCompany,result[0].name, result[0].adress, result[0].promo, result[0].destinations);
                        }
                        resolve(avioSingleContent);
                } else {
                    resolve(204);
                }
            });
        })
    }
}