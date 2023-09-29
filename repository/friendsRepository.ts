import { ConnectionDB } from './connectionDB';
export class FriendRepository {
  idUser!: number;
  connection = new ConnectionDB().openConnection();
  public constructor() {}

  public saveFriend(firstName: string, lastName: string, dateBirth: string, contact: string) {
    return new Promise((resolve) => {
      this.connection.query(
        'INSERT INTO avioschedule.friends (firstName, lastName, dateBirth, contact, idUser) VALUES (?,?,?,?,?)',
        [firstName, lastName, dateBirth, contact, this.idUser],
        function (err, result) {
          if (err) throw err;
          if (result) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  public deleteFriendsBase(id: number) {
    this.connection.query('DELETE FROM avioschedule.friends WHERE idUser = ?;', [id], function (err, result) {
      if (err) throw err;
      if (result) {
        console.log('friends deleted');
      }
    });
  }

  public async checkUserFriendsBase(id: number) {
    return await new Promise((resolve) => {
      this.connection.query('SELECT *  FROM avioschedule.friends WHERE idUser = ?;', [id], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public setUser(idUser: number) {
    this.idUser = Number(idUser);
  }
}
