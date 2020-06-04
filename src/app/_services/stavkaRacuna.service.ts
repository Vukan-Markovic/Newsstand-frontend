import { Injectable } from '@angular/core';
import { StavkaRacuna } from '../_models/stavkaRacuna';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StavkaRacunaService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaRacuna/';

    constructor(private httpClient: HttpClient) { }

    public getStavkeRacuna(racunID: number) {
        return this.httpClient.get<StavkaRacuna[]>(this.API_URL + racunID);
    }

    public addStavkaRacuna(stavkaRacuna: StavkaRacuna) {
        return this.httpClient.post(this.API_URL, stavkaRacuna);
    }

    public updateStavkaRacuna(racunID: number, proizvodID: number, stavkaRacuna: StavkaRacuna) {
        return this.httpClient.put(this.API_URL + racunID + '/' + proizvodID, stavkaRacuna);
    }

    public deleteStavkaRacuna(racunID: number, proizvodID: number) {
        return this.httpClient.delete(this.API_URL + racunID + '/' + proizvodID);
    }
}