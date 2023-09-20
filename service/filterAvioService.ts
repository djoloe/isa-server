
import { AvioRepository } from "../repository/avioRepository";

export class FilterAvio {

    private avioRepository = new AvioRepository();

    public constructor(){

    }

    public async passIdDBAvio (data: Object){
        const idAvio = JSON.parse(JSON.stringify(data)).id;
        const avioContent = await this.avioRepository.filterAvio(idAvio);
        return avioContent;
    }

}