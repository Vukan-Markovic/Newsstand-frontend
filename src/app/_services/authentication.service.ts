import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Korisnik } from '../_models/korisnik';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Korisnik>;
    public currentUser: Observable<Korisnik>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Korisnik>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Korisnik {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>('http://localhost:8080/api//authenticate', { username, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    public setCurrentUserRole(uloga: string) {
        this.currentUserSubject.value.uloga = uloga;
    }

    isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    }

    isProdavac() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value.uloga == "prodavac";
    }

    isDobavljac() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value.uloga == "dobavljač";
    }

    isMenadzer() {
        if (this.isLoggedIn())
            return this.currentUserSubject.value.uloga == "menadžer";
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // register(user: User) {
    //     const body = JSON.stringify(user);
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.post('user/register', body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }

    // login(user: User) {
    //     const body = JSON.stringify(user);
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.post('user/login', body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }

    // logout() {
    //     localStorage.clear();
    // }

    // isLoggedIn() { return localStorage.getItem('token') !== null; }

    // getUser(userID: string) {
    //     return this.http.get('user/' + userID)
    //         .map((response: Response) => {
    //             return response.json().obj;
    //         })
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }

    // getUsers() {
    //     return this.http.get('user/')
    //         .map((response: Response) => {
    //             return response.json().obj;
    //         })
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }

    // changeProfilePicture(user: User) {
    //     const body = JSON.stringify(user);
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    //     return this.http.patch('user/' + localStorage.getItem('userId') + token, body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }
}