import { Prodavac } from './prodavac';

export class Racun {
    racunID: number;
    vremeIzdavanja: Date;
    mestoIzdavanja: string;
    ukupanIznosRacuna: number;
    nazivProdavnice: string; 
    nacinPlacanja: string; 
    brojRacuna: string; 
    tipRacuna: string; 
    prodavac: Prodavac;
}