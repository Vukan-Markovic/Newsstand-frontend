import { Injectable } from '@angular/core';
import { ProizvodDO } from '../_models/proizvodDO';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProizvodService {
    private readonly API_URL = 'http://localhost:8080/api/proizvod/';

    constructor(private httpClient: HttpClient) { }

    public getProizvodi() {
        return this.httpClient.get<ProizvodDO[]>(this.API_URL);
    }

    public getProizvod(id: number) {
        return this.httpClient.get<ProizvodDO>(this.API_URL + id);
    }

    public addProizvod(proizvod: ProizvodDO): void {
        this.httpClient.post(this.API_URL, proizvod).subscribe();
    }

    public updateProizvod(id: number, proizvod: ProizvodDO): void {
        this.httpClient.put(this.API_URL + id, proizvod).subscribe();
    }

    public deleteProizvod(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}