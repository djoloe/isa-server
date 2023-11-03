export class SeatInfo {
  public divs!: Array<string>;
  public idUser!: number;
  public idFlight!: number;

  public constructor(divs: Array<string>, idUser: number, idFlight: number) {
    this.divs = divs;
    this.idUser = idUser;
    this.idFlight = idFlight;
  }
}
