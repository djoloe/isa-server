import { query } from "express";
import { ConnectionDB } from "./connectionDB";
import { existsSync } from "fs";
import { resolve } from "path";
import { BlobOptions } from "buffer";

 export class RegisterRepository{
    
    private connection = new ConnectionDB().openConnection();
    
    existInBase: boolean = false;
    public constructor(){

    }

    public saveUser(paramsOfUser: Object, password: string){
        const paramsInput = JSON.parse(JSON.stringify(paramsOfUser));
        const sql = 'INSERT INTO avioschedule.users (email, firstName, lastName, password, adress) VALUES (?,?,?,?,?)';
        this.connection.query(sql, [paramsInput.email,paramsInput.firstname,paramsInput.lastname,password, paramsInput.adress], function(err, result) {
            if (err) throw err;
            console.log('record inserted');
            });
    }

    public async checkEmail(email: string): Promise<boolean>{
         return await new Promise(async (resolve,reject) => {
            await this.connection.query('SELECT * FROM avioschedule.users WHERE email = ?', [email],  function(err,result){
                if(err) throw err;
                if(result.length > 0){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
         });
    }


}