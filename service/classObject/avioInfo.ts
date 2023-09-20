import { stringify } from "querystring";

export class AvioInfo {

    private idAvioCompany!: number;
    private name!: string;
    private adress!: string;
    private promo!: string;
    private destinations!: Array<string>;
    
    public constructor (idAvioCompany: number,name: string, adress: string, promo: string, destinations: Array<string>){
        this.idAvioCompany = idAvioCompany;
        this.name = name;
        this.adress = adress;
        this.promo = promo;
        this.destinations = destinations;
    }

}