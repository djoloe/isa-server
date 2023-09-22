import { UserRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt';

export class UserService { 

    private readonly saltRounds = 3;
    private userRepoObj = new UserRepository();

    public constructor() {

    }

      public async checkUserForLogin(email: string, password: string){
         let objectBase = await this.userRepoObj.getUserForLogin(email,password);
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

     public hashPassword(body: Object) {
      const data = JSON.stringify(body);
      const parsed = JSON.parse(data);
         bcrypt.hash(parsed.password, this.saltRounds)
         .then(hash => {
         this.userRepoObj.saveUser(parsed,hash);
         })
         .catch( err => {
            console.log('err -> hashPassword');
         })
      
      }
 
     public async checkEmail(email: string): Promise<boolean>{
         let sameEmail: boolean;
         sameEmail = await this.userRepoObj.checkEmail(email);
         return sameEmail;
     }

}