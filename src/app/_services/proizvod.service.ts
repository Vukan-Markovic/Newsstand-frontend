import { Injectable } from '@angular/core';
import { Proizvod } from '../_models/proizvod';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProizvodService {
    private readonly API_URL = 'http://localhost:8080/api/proizvod';
    dataChange: BehaviorSubject<Proizvod[]> = new BehaviorSubject<Proizvod[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getProizvod(): Observable<Proizvod[]> {
        this.httpClient.get<Proizvod[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addProizvod(proizvod: Proizvod): void {
        this.httpClient.post(this.API_URL, proizvod).subscribe();
    }

    public updateProizvod(proizvod: Proizvod): void {
        this.httpClient.put(this.API_URL, proizvod).subscribe();
    }

    public deleteProizvod(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}