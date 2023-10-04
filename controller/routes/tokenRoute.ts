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
let currentToken: any;

router.post('/checkToken', async function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const checkedToken = await tokenServiceObj.checkToken(token);
  if (checkedToken === false) {
    res.sendStatus(203);
  } else {
    currentToken = checkedToken;
  }
});

router.get('/verify/:token', (req) => {
  const { token } = req.params;

  jwt.verify(token, process.env.TOKEN_VERIFICATION as string, function (err, decoded: any) {
    try {
      if (err) throw err;
      if (decoded) {
        console.log('successful!');
        friendServiceObj.acceptedFriends(decoded.data, currentToken.idUser);
      }
    } catch (error) {
      console.log('token expired!');
    }
  });
});

module.exports = router;
