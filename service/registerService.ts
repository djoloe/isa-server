import bcrypt from 'bcrypt';
import { RegisterRepository } from '../repository/registerRepository';
export class RegisterService {

    readonly saltRounds = 3;
    registerRepositoryObject = new RegisterRepository();
    
    public constructor(){

    }

   public hashPassword(body: Object) {
            const data = JSON.stringify(body);
            const parsed = JSON.parse(data);
             bcrypt.hash(parsed.password, this.saltRounds)
             .then(hash => {
               this.registerRepositoryObject.saveUser(parsed,hash);
             })
             .catch( err => {
                console.log('err -> hashPassword');
             })
           
    }

    public async checkEmail(email: string): Promise<boolean>{
      let sameEmail: boolean;
      sameEmail = await this.registerRepositoryObject.checkEmail(email);
      return sameEmail;
   }


  }

  