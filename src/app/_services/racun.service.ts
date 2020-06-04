import { Injectable } from '@angular/core';
import { RacunDO } from '../_models/racunDO';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RacunService {
    private readonly API_URL = 'http://localhost:8080/api/racun/';

    constructor(private httpClient: HttpClient) { }

    public getRacuni() {
        return this.httpClient.get<RacunDO[]>(this.API_URL);
    }

    public getRacun(id: number) {
        return this.httpClient.get<RacunDO>(this.API_URL + id);
    }

    public addRacun(racun: RacunDO) {
        return this.httpClient.post(this.API_URL, racun);
    }

    public updateRacun(id: number, racun: RacunDO) {
        return this.httpClient.put(this.API_URL + id, racun);
    }

    public deleteRacun(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}