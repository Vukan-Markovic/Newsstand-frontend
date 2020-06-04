import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Korisnik } from 'src/app/_models/korisnik';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html'
})
export class KorisnikComponent implements OnInit {
  korisnik: Korisnik;
  userForm: FormGroup;
  message: string = "";
  enabled: boolean;
  isEnabled: boolean;

  constructor(private korisnikService: KorisnikService, private router: Router, 
    private authService: AuthenticationService) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
  }

  onSubmit() {}
}