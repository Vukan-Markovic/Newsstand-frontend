import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KorisnikService } from 'src/app/_services/korisnik.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string = null;
  token: string;

  constructor(private route: ActivatedRoute, private korisnikService: KorisnikService, 
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'passwordRepeat': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe(
      (queyParams: Params) => {
        this.token = queyParams['token'];  
        if (this.token == null) this.router.navigate(['/']);
      }
    );
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = "Please enter a valid data.";
      this.toastr.error(  this.errorMessage, 'Reset password');
      return;
    }

    if (!(this.resetPasswordForm.value.password === this.resetPasswordForm.value.passwordRepeat)) {
      this.errorMessage = "Password must match in both fields.";
      this.toastr.error(  this.errorMessage, 'Reset password');
      return;
    }

    this.korisnikService.updatePassword(this.resetPasswordForm.value.password, this.token).subscribe(
      data => {
        this.toastr.success(data,'Reset password');
        this.router.navigate(['/login']);
      }, message => {
        if (message.status != 200)   this.toastr.error( message.error, 'Reset password');
      }
    );
  }
}