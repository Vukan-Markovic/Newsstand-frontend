import { Injectable } from '@angular/core';
import { PorudzbinaDO } from '../_models/porudzbinaDO';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PorudzbinaService {
    private readonly API_URL = 'http://localhost:8080/api/porudzbina/';

    constructor(private httpClient: HttpClient) { }

    public getPorudzbine() {
        return this.httpClient.get<PorudzbinaDO[]>(this.API_URL);
    }

    public getPorudzbina(id: number) {
        return this.httpClient.get<PorudzbinaDO>(this.API_URL + id);
    }

    public addPorudzbina(porudzbina: PorudzbinaDO): void {
        this.httpClient.post(this.API_URL, porudzbina).subscribe();
    }

    public updatePorudzbina(id: number, porudzbina: PorudzbinaDO): void {
        this.httpClient.put(this.API_URL + id, porudzbina).subscribe();
    }

    public deletePorudzbina(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}