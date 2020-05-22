import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../_models/korisnik';

@Injectable({ providedIn: 'root' })
export class KorisnikService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Korisnik[]>(`${config.apiUrl}/users`);
    }

    register(korisnik: Korisnik) {
        return this.http.post(`${config.apiUrl}/users/register`, korisnik);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}