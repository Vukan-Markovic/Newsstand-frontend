import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenadzerDO } from '../_models/menadzerDO';

@Injectable()
export class MenadzerService {
    private readonly API_URL = 'http://localhost:8080/api/menadzer/';

    constructor(private httpClient: HttpClient) { }

    public getMenadzeri() {
        return this.httpClient.get<MenadzerDO[]>(this.API_URL);
    }

    public getMenadzer(id: number) {
        return this.httpClient.get<MenadzerDO>(this.API_URL + id);
    }

    public addMenadzer(menadzer: MenadzerDO) {
        return this.httpClient.post(this.API_URL, menadzer);
    }

    public updateMenadzer(id: number, menadzer: MenadzerDO) {
        return this.httpClient.put(this.API_URL + id, menadzer);
    }

    public deleteMenadzer(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}