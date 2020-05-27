import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class ZaposleniGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (currentUser.uloga.toLowerCase() == "prodavac" || currentUser.uloga.toLowerCase() == "menadžer") return true;
            this.router.navigate(['/']);
            return false;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}