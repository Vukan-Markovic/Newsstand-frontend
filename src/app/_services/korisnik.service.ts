import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Korisnik } from '../_models/korisnik';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KorisnikService {
    private readonly API_URL = 'http://localhost:8080/api/korisnik/';
    dataChange: BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);
    dataChangeKorisnik: BehaviorSubject<Korisnik> = new BehaviorSubject<Korisnik>(null);

    constructor(private httpClient: HttpClient) { }

    public getKorisnici(): Observable<Korisnik[]> {
        this.httpClient.get<Korisnik[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public getKorisnik(id: number): Observable<Korisnik> {
        this.httpClient.get<Korisnik>(this.API_URL + id).subscribe(data => {
            this.dataChangeKorisnik.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChangeKorisnik.asObservable();
    }

    public getKorisnikByEmail(email: String): Observable<Korisnik> {
        this.httpClient.get<Korisnik>(this.API_URL + 'email/' + email).subscribe(data => {
            this.dataChangeKorisnik.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChangeKorisnik.asObservable();
    }

    public addKorisnik(izvestaj: Korisnik): void {
        this.httpClient.post(this.API_URL, izvestaj).subscribe();
    }

    public updateKorisnik(izvestaj: Korisnik): void {
        this.httpClient.put(this.API_URL, izvestaj).subscribe();
    }

    public deleteKorisnik(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}