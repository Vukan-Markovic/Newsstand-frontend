import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'passwordRepeat': new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.route.queryParams.subscribe(
      (queyParams: Params) => {
        this.token = queyParams['token'];
        if (this.token == null) this.router.navigate(['/']);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      this.errorMessage = "Molimo unesite ispravne podatke.";
      this.toastr.error(this.errorMessage, 'Resetovanje lozinke');
      return;
    }

    if (!(this.resetPasswordForm.value.password === this.resetPasswordForm.value.passwordRepeat)) {
      this.errorMessage = "Lozinke moraju da se podudaraju!";
      this.toastr.error(this.errorMessage, 'Resetovanje lozinke');
      return;
    }

    this.authenticationService.updatePassword(this.resetPasswordForm.value.password, this.token).subscribe(
      data => {
        this.toastr.success(JSON.stringify(data), 'Resetovanje lozinke');
        this.router.navigate(['/login']);
      }, message => {
        if (message.status != 200) this.toastr.error(message.error, 'Resetovanje lozinke');
      }
    );
  }
}