import { Injectable } from '@angular/core';
import { Menadzer } from '../_models/menadzer';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MenadzerService {
    private readonly API_URL = 'http://localhost:8080/api/menadzer';
    dataChange: BehaviorSubject<Menadzer[]> = new BehaviorSubject<Menadzer[]>([]);

    constructor(private httpClient: HttpClient) { }

    public getMenadzer(): Observable<Menadzer[]> {
        this.httpClient.get<Menadzer[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addMenadzer(menadzer: Menadzer): void {
        this.httpClient.post(this.API_URL, menadzer).subscribe();
    }

    public updateMenadzer(menadzer: Menadzer): void {
        this.httpClient.put(this.API_URL, menadzer).subscribe();
    }

    public deleteMenadzer(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}