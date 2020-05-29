import { Injectable } from '@angular/core';
import { StavkaRacuna } from '../_models/stavkaRacuna';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StavkaRacunaService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaRacuna/';

    constructor(private httpClient: HttpClient) { }

    public getStavkeRacuna() {
        return this.httpClient.get<StavkaRacuna[]>(this.API_URL);
    }

    public getStavkaRacuna(racunID: number, proizvodID: number) {
        return this.httpClient.get<StavkaRacuna>(this.API_URL + racunID + '/' + proizvodID);
    }

    public addStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.post(this.API_URL, stavkaRacuna).subscribe();
    }

    public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.put(this.API_URL, stavkaRacuna).subscribe();
    }

    public deleteStavkaRacuna(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}