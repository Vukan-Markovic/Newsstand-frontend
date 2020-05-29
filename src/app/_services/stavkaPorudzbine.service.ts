import { Injectable } from '@angular/core';
import { StavkaPorudzbine } from '../_models/stavkaPorudzbine';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StavkaPorudzbineService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaPorudzbine/';

    constructor(private httpClient: HttpClient) { }

    public getStavkePorudzbine() {
        return this.httpClient.get<StavkaPorudzbine[]>(this.API_URL);
    }

    public getStavkaPorudzbine(porudzbinaID: number, proizvodID: number) {
        return this.httpClient.get<StavkaPorudzbine>(this.API_URL + porudzbinaID + '/' + proizvodID);
    }

    public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
        this.httpClient.post(this.API_URL, stavkaPorudzbine).subscribe();
    }

    public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
        this.httpClient.put(this.API_URL, stavkaPorudzbine).subscribe();
    }

    public deleteStavkaPorudzbine(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}