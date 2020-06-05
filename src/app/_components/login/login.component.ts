import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        if (this.authenticationService.isLoggedIn()) this.router.navigate(['/']);

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            lozinka: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) return;
        this.loading = true;

        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.lozinka)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                    this.snackBar.open(error, "U redu", {
                        duration: 2000,
                        panelClass: ['red-snackbar']
                    });
                });
    }
}