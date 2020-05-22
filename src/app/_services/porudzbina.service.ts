import { Injectable } from '@angular/core';
import { Porudzbina } from '../_models/porudzbina';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PorudzbinaService {
    private readonly API_URL = 'http://localhost:8080/api/porudzbina';
    dataChange: BehaviorSubject<Porudzbina[]> = new BehaviorSubject<Porudzbina[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getPorudzbina(): Observable<Porudzbina[]> {
        this.httpClient.get<Porudzbina[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addPorudzbina(porudzbina: Porudzbina): void {
        this.httpClient.post(this.API_URL, porudzbina).subscribe();
    }

    public updatePorudzbina(porudzbina: Porudzbina): void {
        this.httpClient.put(this.API_URL, porudzbina).subscribe();
    }

    public deletePorudzbina(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}