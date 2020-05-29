import { Injectable } from '@angular/core';
import { Proizvodjac } from '../_models/proizvodjac';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProizvodjacService {
    private readonly API_URL = 'http://localhost:8080/api/proizvodjac/';

    constructor(private httpClient: HttpClient) { }

    public getProizvodjaci() {
        return this.httpClient.get<Proizvodjac[]>(this.API_URL);
    }

    public getProizvodjac(id: number) {
        return this.httpClient.get<Proizvodjac>(this.API_URL + id);
    }

    public addProizvodjac(proizvodjac: Proizvodjac): void {
        this.httpClient.post(this.API_URL, proizvodjac).subscribe();
    }

    public updateProizvodjac(id: number, proizvodjac: Proizvodjac): void {
        this.httpClient.put(this.API_URL + id, proizvodjac).subscribe();
    }

    public deleteProizvodjac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}