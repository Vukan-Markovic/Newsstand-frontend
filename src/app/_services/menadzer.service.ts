import { Injectable } from '@angular/core';
import { Menadzer } from '../_models/menadzer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenadzerService {
    private readonly API_URL = 'http://localhost:8080/api/menadzer/';

    constructor(private httpClient: HttpClient) { }

    public getMenadzeri() {
        return this.httpClient.get<Menadzer[]>(this.API_URL);
    }

    public getMenadzer(id: number) {
        return this.httpClient.get<Menadzer>(this.API_URL + id);
    }

    public addMenadzer(menadzer: Menadzer) {
        return this.httpClient.post(this.API_URL, menadzer);
    }

    public updateMenadzer(id: number, menadzer: Menadzer) {
        return this.httpClient.put(this.API_URL + id, menadzer);
    }

    public deleteMenadzer(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}