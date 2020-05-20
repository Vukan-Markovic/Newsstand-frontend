import { Injectable } from '@angular/core';
import { Tim } from '../models/tim';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TimService {
    private readonly API_URL = 'http://localhost:8083/tim/';
    dataChange: BehaviorSubject<Tim[]> = new BehaviorSubject<Tim[]>([]);
    private readonly API_URL_BYID = 'http://localhost:8083/igraciZaTimId/';
    dataChange: BehaviorSubject<Igrac[]> = new BehaviorSubject<Igrac[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getAllTim(): Observable<Tim[]> {
        this.httpClient.get<Tim[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public getIgraceZaTim(idTima): Observable<Igrac[]> {
        this.httpClient.get<Igrac[]>(this.API_URL_BYID + idTima).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addTim(tim: Tim): void {
        this.httpClient.post(this.API_URL, tim).subscribe();
    }

    public updateTim(tim: Tim): void {
        this.httpClient.put(this.API_URL, tim).subscribe();
    }

    public deleteTim(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}