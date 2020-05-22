import { Injectable } from '@angular/core';
import { Proizvodjac } from '../_models/proizvodjac';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProizvodjacService {
    private readonly API_URL = 'http://localhost:8080/api/proizvodjac';
    dataChange: BehaviorSubject<Proizvodjac[]> = new BehaviorSubject<Proizvodjac[]>([]);
    
    constructor(private httpClient: HttpClient) { }

    public getProizvodjac(): Observable<Proizvodjac[]> {
        this.httpClient.get<Proizvodjac[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addProizvodjac(proizvodjac: Proizvodjac): void {
        this.httpClient.post(this.API_URL, proizvodjac).subscribe();
    }

    public updateProizvodjac(proizvodjac: Proizvodjac): void {
        this.httpClient.put(this.API_URL, proizvodjac).subscribe();
    }

    public deleteProizvodjac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}

// import { Injectable } from '@angular/core';
// import { Meal } from '../models/meal';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { AddMealDTO } from '../models/addMealDTO';
// import { MealUpdate } from '../models/updateMeal';
// import { environment } from '../environment';
// import { InsertMealDTO } from '../models/inserMealDTO';

// @Injectable()
// export class MealService {
//     baseurl = environment.baseUrl;
//     dataChange: BehaviorSubject<Meal[]> = new BehaviorSubject<Meal[]>([]);
//     successEmitter = new Subject<InsertMealDTO>();

//     successEmitterUpdate = new Subject<MealUpdate>();
//     constructor(private httpClient: HttpClient) { }

//     public getAllMeal(): Observable<Meal[]> {
//         this.httpClient.get<Meal[]>(this.baseurl + '/meal/all/').subscribe(data => {
//             this.dataChange.next(data);
//         },
//             (error: HttpErrorResponse) => {

//             });

//         return this.dataChange.asObservable();
//     }

//     sendToken(token: string) {
//         this.http.post(this.baseurl + '/api/confirmAccount', null, {
//             params: new HttpParams().set('token', token)
//         }).subscribe(data => {
//             this.router.navigate(['/login']);
//         },
//             error => {
//             });
//     }

//     public addMeal(meal: InsertMealDTO) {
//         return this.httpClient.post(this.baseurl + '/meal/', meal);
//     }

//     public updateMeal(meal: MealUpdate) {
//         return this.httpClient.put(this.baseurl + '/meal/', meal);
//     }

//     public deleteMeal(id: number): void {
//         this.httpClient.delete(this.baseurl + '/meal/' + id).subscribe();
//     }
// }