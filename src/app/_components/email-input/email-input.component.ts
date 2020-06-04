import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent implements OnInit {
  emailForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.authenticationService.resetPassword(this.emailForm.value.email).subscribe(
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
      });
  }
}