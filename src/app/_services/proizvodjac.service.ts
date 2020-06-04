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

    public addProizvodjac(proizvodjac: Proizvodjac) {
        return this.httpClient.post(this.API_URL, proizvodjac);
    }

    public updateProizvodjac(id: number, proizvodjac: Proizvodjac) {
        return this.httpClient.put(this.API_URL + id, proizvodjac);
    }

    public deleteProizvodjac(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}