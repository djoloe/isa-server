import { ConnectionDB } from "./connectionDB";

export class LoginRepository{

    private connection = new ConnectionDB().openConnection();

    public constructor() {

    }

    
    public async getUserForLogin(email:string, password: string): Promise<any>{
        let passwordObject = {
            idBase: Number,
            passwordBase: String
        };
        return await new Promise((resolve,reject) => {
            this.connection.query(`SELECT * FROM avioschedule.users WHERE email = ?;`, [email] , function(err,result) {
                if(err) throw (err);
                if(result.length > 0){
                    passwordObject.idBase = result[0].idusers;
                    passwordObject.passwordBase = result[0].password;
                    resolve(passwordObject);
                } else {
                    resolve(false);
                }
            })
        })
    }
}