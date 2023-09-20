export class Flight {

    id!: number;
    departDate!: string;
    returnDate!: string;
    timeTravel!: number;
    classTrip!: string;
    stops!: number;
    price!: string;
    fromPlace!: string;
    toPlace!: string;
    idAvioCompany!: number;

    public constructor(id: number, departDate: string, returnDate: string, timeTravel: number, classTrip: string, stops: number, price: string, fromPlace: string, toPlace: string, idAvioCompany: number){
        this.id = id;
        this.departDate = departDate;
        this.returnDate = returnDate;
        this.timeTravel = timeTravel;
        this.classTrip  = classTrip;
        this.stops = stops;
        this.price = price;
        this.fromPlace  = fromPlace;
        this.toPlace = toPlace;
        this.idAvioCompany = idAvioCompany;
    }

}