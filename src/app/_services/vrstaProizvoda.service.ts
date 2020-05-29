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

    public addVrstaProizvoda(vrstaProizvoda: VrstaProizvoda): void {
        this.httpClient.post(this.API_URL, vrstaProizvoda).subscribe();
    }

    public updateVrstaProizvoda(id: number, vrstaProizvoda: VrstaProizvoda): void {
        this.httpClient.put(this.API_URL + id, vrstaProizvoda).subscribe();
    }

    public deleteVrstaProizvoda(id: number): void {
        console.log(id);
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}