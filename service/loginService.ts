import bcrypt from 'bcrypt';
import { LoginRepository } from '../repository/loginRepository';
export class LoginService { 

    loginRepositoryObject = new LoginRepository();
    public constructor() {

    }

    public async checkUserForLogin(email: string, password: string){
        let objectBase = await this.loginRepositoryObject.getUserForLogin(email,password);
        if(objectBase){
           return new Promise((resolve, reject) => {
              bcrypt.compare(password, String(objectBase.passwordBase) , (err, result) => {
                 if(err) throw err;
                 if (result) {
                    resolve(objectBase.idBase);
                 } else {
                    resolve(false);
                 }
              });
           })
        }
     }
      
}