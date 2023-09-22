import { ConnectionDB } from "./connectionDB";

export class UserRepository {

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