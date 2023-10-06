import express from 'express';
import { FriendService } from '../../service/friendsService';

const router = express.Router();
const friendsServiceObj = new FriendService();

router.post('/friends', function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  friendsServiceObj.parseFriends(req.body, token);
  res.sendStatus(200);
});

router.post('/deleteFriends', function (req) {
  friendsServiceObj.deleteFriends(req.body.idUser);
});

router.post('/checkUserFriends', async function (req, res) {
  const haveFriends = await friendsServiceObj.checkUserFriends(req.body.idUser);
  res.send(haveFriends);
});

module.exports = router;
