import { Proizvodjac } from './proizvodjac';
import { VrstaProizvoda } from './vrstaProizvoda';
import { StavkaRacuna } from './stavkaRacuna';
import { StavkaPorudzbine } from './stavkaPorudzbine';

export class Proizvod {
    proizvodID: number;
    nazivProizvoda: string;
    opisProizvoda: string;
    cena: number;
    tipPakovanja: string;
    velicinaPakovanja: string;
    barKod: string;
    masa: number;
    raspolozivaKolicina: number;
    proizvodjac: Proizvodjac;
    vrstaProizvoda: VrstaProizvoda;
    stavkaRacuna: StavkaRacuna; 
    stavkaPorudzbine: StavkaPorudzbine;
}