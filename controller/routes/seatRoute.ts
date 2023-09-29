import express from 'express';
import { SeatService } from '../../service/seatService';

const router = express.Router();
const seatService = new SeatService();

router.post('/seat', async function (req, res) {
  const saved = await seatService.parseSeats(req.body);
  res.send(saved);
});

router.post('/loadSeatsFlight', async function (req, res) {
  const divs = await seatService.checkFlightDivDB(req.body.idFlight);
  res.send(divs);
});

router.post('/removeReservation', async function (req, res) {
  const isDeleted = await seatService.passID(req.body.idUser);
  res.send(isDeleted);
});

module.exports = router;
