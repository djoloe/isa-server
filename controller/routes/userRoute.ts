/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { UserService } from '../../service/userService';
import { MailSender } from '../../service/mailService';
const userServiceObj = new UserService();

const router = express.Router();

router.post('/register', async function (req, res) {
  if ((await userServiceObj.checkEmail(req.body.email)) === true) {
    res.sendStatus(202);
  } else {
    userServiceObj.hashPassword(req.body);
    res.sendStatus(203);
  }
});

router.post('/login', async function (req, res) {
  const data: any = await userServiceObj.checkUserForLogin(req.body.email, req.body.password);
  if (!data) {
    res.sendStatus(202);
  }
  res.send(data);
});

module.exports = router;
