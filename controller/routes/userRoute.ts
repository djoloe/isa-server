import express from 'express'
import { UserService } from '../../service/userService';
const userServiceObj = new UserService();

const router = express.Router();


router.post('/register', async function (req,res,next) {
    if(await (userServiceObj.checkEmail(req.body.email)) === true) {
        res.sendStatus(202);
    } else{
        userServiceObj.hashPassword(req.body);
        res.sendStatus(203);
    }
})

router.post('/login',  async function(req,res,next) {
        const id:any = await userServiceObj.checkUserForLogin(req.body.email, req.body.password);
        if(typeof(id) === 'number'){
            res.cookie('id',id).send();
        } else {
            res.sendStatus(202);
        }

})

module.exports = router;