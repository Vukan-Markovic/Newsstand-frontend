import { Injectable } from '@angular/core';
import { StavkaPorudzbine } from '../_models/stavkaPorudzbine';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StavkaPorudzbineService {
    private readonly API_URL = 'http://localhost:8080/api/stavkaPorudzbine';
    dataChange: BehaviorSubject<StavkaPorudzbine[]> = new BehaviorSubject<StavkaPorudzbine[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getStavkaPorudzbine(): Observable<StavkaPorudzbine[]> {
        this.httpClient.get<StavkaPorudzbine[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
        this.httpClient.post(this.API_URL, stavkaPorudzbine).subscribe();
    }

    public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
        this.httpClient.put(this.API_URL, stavkaPorudzbine).subscribe();
    }

    public deleteStavkaPorudzbine(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}