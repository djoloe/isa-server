import express from 'express'
import { FilterFlightsService } from '../../service/chooseFlight';


const router = express.Router();
const filterFlight = new FilterFlightsService();

router.post('/companyInfo', async function(req,res,next){
    const avioInfo = await filterFlight.passIdDBAvio(req.body);
    res.send(avioInfo);
})

router.post('/searchFlights', async function(req,res,next){
    const flight = await filterFlight.filterByParams(req.body);
    res.send(flight);
})



module.exports = router;