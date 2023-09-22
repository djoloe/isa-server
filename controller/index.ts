import express, { Express, Request, Response, response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { RegisterService } from '../service/registerService';
import { LoginService } from '../service/loginService';
import { FilterFlightsService } from '../service/filterFlightService';
import { FilterAvio } from '../service/filterAvioService';
import { ChooseSeatService } from '../service/chooseSeatService';
import { CheckSeatsService } from '../service/checkSeatsService';
import { RemoveReservationService } from '../service/removeReservationService';
import { type } from 'os';


const app: Express = express();
const staticRegister = new RegisterService();
const staticLogin = new LoginService();
const filterFlight = new FilterFlightsService();
const filterAvio = new FilterAvio();
const chooseSeats = new ChooseSeatService();
const checkSeats = new CheckSeatsService();
const removeReservation = new RemoveReservationService();

app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500',
}
));


app.post('/register', async function (req,res,next) {
        if(await (staticRegister.checkEmail(req.body.email)) === true) {
            res.sendStatus(202);
        } else{
            staticRegister.hashPassword(req.body);
            res.sendStatus(203);
        }
})

app.post('/login',  async function(req,res,next) {
        const id:any = await staticLogin.checkUserForLogin(req.body.email, req.body.password);
        if(typeof(id) === 'number'){
            res.cookie('id',id).send();
        } else {
            res.sendStatus(202);
        }

})

app.post('/searchFlights', async function(req,res,next){
    const flight = await filterFlight.filterByParams(req.body);
    res.send(flight);
})

app.post('/companyInfo', async function(req,res,next){
    const avioInfo = await filterAvio.passIdDBAvio(req.body);
    res.send(avioInfo);
})

app.post('/seat', async function(req,res,next) {
    const saved = await chooseSeats.parseSeats(req.body);
    res.send(saved);
})

app.post('/loadSeatsFlight', async function(req,res,next) {
    const divs = await checkSeats.checkFlightDivDB(req.body.idFlight);
    res.send(divs);
})

app.post('/removeReservation', async function (req,res,next) {
    const isDeleted = await removeReservation.passID(req.body.idUser);
    res.send(isDeleted);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})


