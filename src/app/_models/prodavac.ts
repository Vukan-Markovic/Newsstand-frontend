import { MenadzerDO } from './menadzerDO';

export class Prodavac {
    prodavacID: number;
    ime: string;
    prezime: string;
    pol: string;
    datumRodjenja: Date;
    adresaStanovanja: string;
    telefon: string;
    JMBG: string;
    datumZaposlenja: Date;
    strucnaSprema: string;
    menadzer: MenadzerDO;
}