import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Korisnik } from '../_models/korisnik';
import { KorisnikService } from './korisnik.service';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Korisnik>;
    public currentUser: Observable<Korisnik>;
    private readonly API_URL = 'http://localhost:8080/api/';

    constructor(private httpClient: HttpClient, private korisnikService: KorisnikService) {
        this.currentUserSubject = new BehaviorSubject<Korisnik>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Korisnik {
        if (this.currentUserSubject.value) return this.currentUserSubject.value[0];
    }

    login(email, lozinka) {
        return this.httpClient.post<any>(this.API_URL + 'login', { email, lozinka })
            .pipe(map(data => {
                this.korisnikService.getKorisnikByEmail(email).subscribe(korisnik => {
                    korisnik[0].token = data.token;
                    localStorage.setItem('currentUser', JSON.stringify(korisnik));
                    this.currentUserSubject.next(korisnik);
                    return korisnik;
                });
            }));
    }

    register(korisnik: Korisnik) {
        return this.httpClient.post<Korisnik>(this.API_URL + 'korisnik', korisnik);
    }

    resetPassword(email: String) {
        return this.httpClient.post(this.API_URL + 'resetPassword', { email });
    }

    public updatePassword(lozinka: String, token: string) {
        let params = new HttpParams();
        params = params.append('code', token);
        return this.httpClient.put(this.API_URL + 'updatePassword', { lozinka }, { params: params });
    }

    public setCurrentUserRole(uloga: string) {
        this.currentUserSubject.value[0].uloga = uloga;
    }

    isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    }

    isZaposleni() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value[0].uloga == "prodavac" || this.currentUserSubject.value[0].uloga == "menadžer";
    }

    isDobavljac() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value[0].uloga == "dobavljač";
    }

    isMenadzer() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value[0].uloga == "menadžer";
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}