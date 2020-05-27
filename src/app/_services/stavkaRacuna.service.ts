import { Injectable } from '@angular/core';
import { StavkaRacuna } from '../_models/stavkaRacuna';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StavkaRacunaService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaRacuna/';
    dataChange: BehaviorSubject<StavkaRacuna[]> = new BehaviorSubject<StavkaRacuna[]>([]);
    dataChangeStavkaRacuna: BehaviorSubject<StavkaRacuna> = new BehaviorSubject<StavkaRacuna>(null);

    constructor(private httpClient: HttpClient) { }

    public getStavkeRacuna(): Observable<StavkaRacuna[]> {
        this.httpClient.get<StavkaRacuna[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public getStavkaRacuna(racunID: number, proizvodID: number): Observable<StavkaRacuna> {
        this.httpClient.get<StavkaRacuna>(this.API_URL + racunID + '/' + proizvodID).subscribe(data => {
            this.dataChangeStavkaRacuna.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChangeStavkaRacuna.asObservable();
    }

    public addStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.post(this.API_URL, stavkaRacuna).subscribe();
    }

    public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.put(this.API_URL, stavkaRacuna).subscribe();
    }

    public deleteStavkaRacuna(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}