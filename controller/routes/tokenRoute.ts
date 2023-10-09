/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { TokenService } from '../../service/tokenService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { FriendService } from '../../service/friendsService';
import { Certificate } from 'crypto';
dotenv.config({ path: './.env' });
const tokenServiceObj = new TokenService();
const friendServiceObj = new FriendService();
const router = express.Router();

router.post('/checkToken', async function (req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const checkedTokenInfo = await tokenServiceObj.checkToken(token);
    if (checkedTokenInfo === false) {
      res.sendStatus(203);
    } else if (checkedTokenInfo.role === 'Admin') {
      res.sendStatus(204);
    } else {
      res.sendStatus(205);
    }
  } catch (error) {
    return false;
  }
});

router.get('/verify/:token', (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.TOKEN_VERIFICATION as string, function (err, decoded: any) {
      if (err) throw err;
      if (decoded) {
        console.log('successful!');
        res.send('<script>alert("confirmed!");window.close();</script >');
        friendServiceObj.acceptedFriends(decoded.data);
      }
    });
  } catch (error) {
    console.log('token expired!');
  }
});

module.exports = router;
