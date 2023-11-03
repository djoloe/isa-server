import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({ path: '/.env' });

export class ConnectionDB {
  public constructor() {}

  public openConnection() {
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'root1234',
      port: 3306,
      multipleStatements: false,
    });

    connection.connect((err) => {
      if (err) throw err;
      console.log('connected');
    });
    return connection;
  }
}
