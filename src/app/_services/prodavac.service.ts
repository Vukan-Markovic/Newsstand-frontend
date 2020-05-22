import { Injectable } from '@angular/core';
import { Prodavac } from '../_models/prodavac';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProdavacService {
    private readonly API_URL = 'http://localhost:8080/api/prodavac';
    dataChange: BehaviorSubject<Prodavac[]> = new BehaviorSubject<Prodavac[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getProdavac(): Observable<Prodavac[]> {
        this.httpClient.get<Prodavac[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addProdavac(prodavac: Prodavac): void {
        this.httpClient.post(this.API_URL, prodavac).subscribe();
    }

    public updateProdavac(prodavac: Prodavac): void {
        this.httpClient.put(this.API_URL, prodavac).subscribe();
    }

    public deleteProdavac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}