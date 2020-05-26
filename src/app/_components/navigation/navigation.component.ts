import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/_models/korisnik';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser: Korisnik;
  
  constructor(private authenticationService: AuthenticationService, private userService: KorisnikService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    // this.userService.getUser(this.authService.currentUserSubject.value.email)
    //     .subscribe(user => {
    //       this.user = user;
    //     });
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

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

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
