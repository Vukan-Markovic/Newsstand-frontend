import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html'
})
export class EmailInputComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) this.router.navigate(['/']);

    this.emailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  get f() {
    return this.emailForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.emailForm.invalid) return;
    this.loading = true;

    this.authenticationService.resetPassword(this.emailForm.value.email).subscribe(
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
      });
  }
}