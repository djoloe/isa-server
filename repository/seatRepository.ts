import { ConnectionDB } from './connectionDB';
import { SeatInfo } from '../service/classObject/seatInfo';

export class SeatRepository {
  private connection = new ConnectionDB().openConnection();

  public constructor() {}

  public async checkSeats(idFlight: number) {
    return await new Promise((resolve) => {
      const flightsArray: Array<string> = [];
      const sql = 'SELECT * FROM avioschedule.seats WHERE idFlight = ?';
      this.connection.query(sql, [idFlight], function (err, result) {
        if (err) throw err;
        if (result) {
          for (let i = 0; i < result.length; i++) {
            flightsArray.push(result[i]);
            resolve(flightsArray);
          }
        }
      });
    });
  }

  public populateSeats(data: SeatInfo) {
    return new Promise((resolve) => {
      const sql = 'INSERT INTO avioschedule.seats (seat, idUser, idFlight) VALUES (?,?,?)';
      this.connection.query(sql, [JSON.stringify(data.divs), data.idUser, data.idFlight], function (err, result) {
        if (err) throw err;
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public removeSeatsDB(idUser: number) {
    return new Promise(async (resolve) => {
      const sql = 'DELETE FROM avioschedule.seats WHERE idUser = ?';
      await this.connection.query(sql, [idUser], function (err, result) {
        if (err) throw err;
        if (result) {
          resolve('true');
        }
      });
    });
  }
}
