import { Dobavljac } from './dobavljac';
import { Menadzer } from './menadzer';
import { Prodavac } from './prodavac';

export class Porudzbina {
    porudzbinaID: number;
    datumPorucivanja: Date;
    datumIsporuke: Date; 
    ukupanIznosPorudzbine: number;
    statusPorudzbine: string; 
    dobavljac: Dobavljac; 
    menadzer: Menadzer; 
    prodavac: Prodavac; 
}