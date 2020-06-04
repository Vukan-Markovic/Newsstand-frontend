import { Injectable } from '@angular/core';
import { StavkaPorudzbine } from '../_models/stavkaPorudzbine';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StavkaPorudzbineService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaPorudzbine/';

    constructor(private httpClient: HttpClient) { }

    public getStavkePorudzbine(porudzbinaID: number) {
        return this.httpClient.get<StavkaPorudzbine[]>(this.API_URL + porudzbinaID);
    }

    public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine) {
        return this.httpClient.post(this.API_URL, stavkaPorudzbine);
    }

    public updateStavkaPorudzbine(porudzbinaID: number, proizvodID: number, stavkaPorudzbine: StavkaPorudzbine) {
        return this.httpClient.put(this.API_URL + porudzbinaID + '/' + proizvodID, stavkaPorudzbine);
    }

    public deleteStavkaPorudzbine(porudzbinaID: number, proizvodID: number) {
        return this.httpClient.delete(this.API_URL + porudzbinaID + '/' + proizvodID);
    }
}