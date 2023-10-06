import express from 'express';
import { SeatService } from '../../service/seatService';

const router = express.Router();
const seatService = new SeatService();

router.post('/seat', async function (req, res) {
  const saved = await seatService.parseSeats(req.body, req.headers);
  res.send(saved);
});

router.post('/loadSeatsFlight', async function (req, res) {
  const divsToken = await seatService.checkFlightDivDB(req.body.idFlight, req.headers);
  res.send(divsToken);
});

router.post('/removeReservation', async function (req, res) {
  const isDeleted = seatService.passToken(req.headers);
  res.send(isDeleted);
});

module.exports = router;
