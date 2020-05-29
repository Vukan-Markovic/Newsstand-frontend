import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  isZaposleni() {
    return this.authenticationService.isZaposleni();
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