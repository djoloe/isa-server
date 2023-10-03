import express from 'express';
import { TokenService } from '../../service/tokenService';
const tokenServiceObj = new TokenService();

const router = express.Router();

router.post('/checkToken', function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (tokenServiceObj.checkToken(token) === false) {
    res.sendStatus(203);
  }
});

module.exports = router;
