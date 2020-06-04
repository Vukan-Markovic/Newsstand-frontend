import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string = null;
  token: string;
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'passwordRepeat': new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.route.queryParams.subscribe(
      (queyParams: Params) => {
        this.token = queyParams['code'];
        if (this.token == null) this.router.navigate(['/']);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      this.errorMessage = "Molimo unesite ispravne podatke.";
      this.snackBar.open(this.errorMessage, "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    if (!(this.resetPasswordForm.value.password === this.resetPasswordForm.value.passwordRepeat)) {
      this.errorMessage = "Lozinke moraju da se podudaraju!";
      this.snackBar.open(this.errorMessage, "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    this.authenticationService.updatePassword(this.resetPasswordForm.value.password, this.token).subscribe(
      data => {
        this.snackBar.open(data['message'], "U redu", {
          duration: 2000
        });
        this.router.navigate(['/login']);
      }, error => {
        this.snackBar.open(error, "U redu", {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      }
    );
  }
}