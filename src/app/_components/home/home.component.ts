import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Korisnik } from '../../_models/korisnik';
import { AuthenticationService } from '../../_services/authentication.service';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: Korisnik;
    users = [];

    constructor(private authenticationService: AuthenticationService, private userService: KorisnikService,
        private router: Router) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        // this.userService.getUser(this.authService.currentUserSubject.value.email)
        //     .subscribe(user => {
        //       this.user = user;
        //     });
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.loadAllUsers());
    // }

    isLoggedIn() {
        return this.authenticationService.isLoggedIn();
    }

    isProdavac() {
        return this.authenticationService.isProdavac();
    }


    isDobavljac() {
        return this.authenticationService.isDobavljac();
    }

    isMenadzer() {
        return this.authenticationService.isMenadzer();
    }

    onLogout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}