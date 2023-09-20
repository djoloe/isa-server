
import { FilterFlightRepository } from "../repository/filterFlightRepository";
export class FilterFlightsService {

     filterFlightRepository = new FilterFlightRepository();

    public constructor( ) {

    }

    public async filterByParams(data: Object){
        const parsedData = JSON.parse(JSON.stringify(data));
        const string1 = this.convertDateForBase(parsedData.depart);
        const string2 = this.convertDateForBase(parsedData.return);
        const exist = await this.filterFlightRepository.filterFlight(parsedData.class,parsedData.from,parsedData.to,string1,string2);
        return exist;
    }

    public convertDateForBase(newDepartDate:string){
        let stringBase: string = '';
           
           const replacedDate = newDepartDate.split('-');
           for(let i = replacedDate.length -1 ; i >= 0; i--){
                if(i > 0){
                    stringBase += replacedDate[i] + '/';
                } else {
                    stringBase += replacedDate[i];
                }
           }
        return stringBase;
    }
}