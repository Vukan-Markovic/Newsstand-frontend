import { Injectable } from '@angular/core';
import { Dobavljac } from '../_models/dobavljac';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DobavljacService {
    private readonly API_URL = 'http://localhost:8080/api/dobavljac/';

    constructor(private httpClient: HttpClient) { }

    public getDobavljaci() {
        return this.httpClient.get<Dobavljac[]>(this.API_URL);
    }

    public getDobavljac(id: number) {
        return this.httpClient.get<Dobavljac>(this.API_URL + id);
    }

    public addDobavljac(dobavljac: Dobavljac) {
        return this.httpClient.post(this.API_URL, dobavljac);
    }

    public updateDobavljac(id: number, dobavljac: Dobavljac): void {
        this.httpClient.put(this.API_URL + id, dobavljac).subscribe();
    }

    public deleteDobavljac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}