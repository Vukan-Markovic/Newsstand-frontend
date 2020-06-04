import { Injectable } from '@angular/core';
import { Prodavac } from '../_models/prodavac';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdavacService {
    private readonly API_URL = 'http://localhost:8080/api/prodavac/';

    constructor(private httpClient: HttpClient) { }

    public getProdavci() {
        return this.httpClient.get<Prodavac[]>(this.API_URL);
    }

    public getProdavac(id: number) {
        return this.httpClient.get<Prodavac>(this.API_URL + id);
    }

    public addProdavac(prodavac: Prodavac) {
        return this.httpClient.post(this.API_URL, prodavac);
    }

    public updateProdavac(id: number, prodavac: Prodavac) {
        return this.httpClient.put(this.API_URL + id, prodavac);
    }

    public deleteProdavac(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}