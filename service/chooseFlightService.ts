import { AvioRepository } from '../repository/avioInfoRepository';
export class FilterFlightsService {
  private avioInfoObj = new AvioRepository();

  public constructor() {}

  public async filterByParams(data: object) {
    const parsedData = JSON.parse(JSON.stringify(data));
    const string1 = this.convertDateForBase(parsedData.depart);
    const string2 = this.convertDateForBase(parsedData.return);
    const exist = await this.avioInfoObj.filterFlight(parsedData.class, parsedData.from, parsedData.to, string1, string2);
    return exist;
  }

  public convertDateForBase(newDepartDate: string) {
    let stringBase: string = '';

    const replacedDate = newDepartDate.split('-');
    for (let i = replacedDate.length - 1; i >= 0; i--) {
      if (i > 0) {
        stringBase += replacedDate[i] + '/';
      } else {
        stringBase += replacedDate[i];
      }
    }
    return stringBase;
  }

  public async passIdDBAvio(data: object) {
    const idAvio = JSON.parse(JSON.stringify(data)).id;
    const avioContent = await this.avioInfoObj.filterAvio(idAvio);
    return avioContent;
  }
}
