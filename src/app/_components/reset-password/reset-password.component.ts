import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
  submitted = false;
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) this.router.navigate(['/']);

    this.route.queryParams.subscribe(
      (queyParams: Params) => {
        this.token = queyParams['code'];
        if (this.token == null) this.router.navigate(['/']);
      }
    );

    this.resetPasswordForm = new FormGroup({
      'lozinka': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'passwordRepeat': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) return;

    if (!(this.resetPasswordForm.value.lozinka === this.resetPasswordForm.value.passwordRepeat)) {
      this.snackBar.open("Lozinke moraju da se podudaraju!", "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    this.loading = true;

    this.authenticationService.updatePassword(this.resetPasswordForm.value.lozinka, this.token).subscribe(
      data => {
        this.snackBar.open(data['message'], "U redu", {
          duration: 2000
        });
        this.router.navigate(['/login']);
      }, error => {
        this.loading = false;
        this.snackBar.open(error, "U redu", {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      }
    );
  }
}