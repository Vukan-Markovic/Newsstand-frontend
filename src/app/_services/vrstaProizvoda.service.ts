import { Injectable } from '@angular/core';
import { VrstaProizvoda } from '../_models/vrstaProizvoda';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VrstaProizvodaService {
    private readonly API_URL = 'http://localhost:8080/api/vrstaProizvoda/';

    constructor(private httpClient: HttpClient) { }

    public getVrsteProizvoda() {
        return this.httpClient.get<VrstaProizvoda[]>(this.API_URL);
    }

    public getVrstaProizvoda(id: number) {
        return this.httpClient.get<VrstaProizvoda>(this.API_URL + id);
    }

    public addVrstaProizvoda(vrstaProizvoda: VrstaProizvoda) {
        return this.httpClient.post(this.API_URL, vrstaProizvoda);
    }

    public updateVrstaProizvoda(id: number, vrstaProizvoda: VrstaProizvoda) {
        return this.httpClient.put(this.API_URL + id, vrstaProizvoda);
    }

    public deleteVrstaProizvoda(id: number) {
        return this.httpClient.delete(this.API_URL + id);
    }
}