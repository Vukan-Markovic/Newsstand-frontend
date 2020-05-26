import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { KorisnikService } from '../../_services/korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { Korisnik } from 'src/app/_models/korisnik';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    korisnik = new Korisnik();
    prodavac = new Prodavac();
    dobavljac = new Dobavljac();
    menadzer = new Menadzer();

    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService,
        private korisnikService: KorisnikService, private toastr: ToastrService, private prodavacService: ProdavacService,
        private menadzerService: MenadzerService, private dobavljacService: DobavljacService) {
        if (this.authenticationService.currentUserValue) this.router.navigate(['/']);
    }
   
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            lozinka: ['', [Validators.required, Validators.minLength(8)]],
            passwordRepeat: ['', [Validators.required, Validators.minLength(8)]],
            uloga: ['', [Validators.required]],
            skraceniNaziv: ['', [Validators.required]],
            punNaziv: ['', [Validators.nullValidator]],
            kontaktDobavljaca: ['', [Validators.required]],
            adresaDobavljaca: ['', [Validators.required]],
            grad: ['', [Validators.nullValidator]],
            drzava: ['', [Validators.nullValidator]],
            postanskiBroj: ['', [Validators.required]],
            PIB: ['', [Validators.required]],
            kontaktOsoba: ['', [Validators.nullValidator]],
            brojZiroRacuna: ['', [Validators.nullValidator]],
            ime: ['', [Validators.nullValidator]],
            prezime: ['', [Validators.required]],
            pol: ['', [Validators.required]],
            datumRodjenja: ['', [Validators.required]],
            adresaStanovanja: ['', [Validators.nullValidator]],
            telefon: ['', [Validators.nullValidator]],
            JMBG: ['', [Validators.required]],
            datumZaposlenja: ['', [Validators.nullValidator]],
            strucnaSprema: ['', [Validators.required]],
            adresaKancelarije: ['', [Validators.required]],
            brojKancelarije: ['', [Validators.nullValidator]]
        });

        this.registerForm.get('ime').valueChanges.subscribe(val => {
            if (this.isProdavac()) {
                this.registerForm.controls['ime'].setValidators([Validators.required]);
                this.registerForm.controls['ime'].updateValueAndValidity();
            } else {
                this.registerForm.controls['ime'].clearValidators();
                this.registerForm.controls['ime'].updateValueAndValidity();
            }
        });
    }

    isProdavac() {
        if (this.registerForm.value.uloga == 'prodavac') return true;
        return false;
    }

    isMenadzer() {
        if (this.registerForm.value.uloga == 'menadžer') return true;
        return false;
    }

    isDobavljac() {
        if (this.registerForm.value.uloga == 'dobavljač') return true;
        return false;
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) return;

        if (!(this.registerForm.value.lozinka === this.registerForm.value.passwordRepeat)) {
            this.toastr.error("Lozinke moraju da se podudaraju!", 'Registracija');
            return;
        }

        this.loading = true;
        this.korisnik.email = this.registerForm.value.email;
        this.korisnik.lozinka = this.registerForm.value.lozinka;
        this.korisnik.uloga = this.registerForm.value.uloga;

        this.authenticationService.register(this.korisnik)
            .pipe(first())
            .subscribe(
                data => {
                    this.korisnikService.getKorisnikByEmail(this.korisnik.email).subscribe(data => {
                        if (this.korisnik.uloga == 'prodavac' || this.korisnik.uloga == 'menadžer') {
                            this.prodavac.JMBG = this.registerForm.value.JMBG;
                            this.prodavac.adresaStanovanja = this.registerForm.value.adresaStanovanja;
                            this.prodavac.datumRodjenja = this.registerForm.value.datumRodjenja;
                            this.prodavac.datumZaposlenja = this.registerForm.value.datumZaposlenja;
                            this.prodavac.ime = this.registerForm.value.ime;
                            this.prodavac.pol = this.registerForm.value.pol;
                            this.prodavac.prezime = this.registerForm.value.prezime;
                            this.prodavac.prodavacID = data.korisnikID;
                            this.prodavac.strucnaSprema = this.registerForm.value.strucnaSprema;
                            this.prodavac.telefon = this.registerForm.value.telefon;
                            this.prodavacService.addProdavac(this.prodavac).subscribe(res => {
                                if (this.korisnik.uloga == 'menadžer') {
                                    this.menadzer.adresaKancelarije = this.registerForm.value.adresaKancelarije;
                                    this.menadzer.brojKancelarije = this.registerForm.value.brojKancelarije;
                                    this.menadzer.menadzerID = data.korisnikID;
                                    this.menadzerService.addMenadzer(this.menadzer).subscribe(r => {
                                        this.router.navigate(['/login']);
                                    });
                                }
                                this.router.navigate(['/login']);
                            });
                        } else {
                            this.dobavljac.PIB = this.registerForm.value.PIB;
                            this.dobavljac.adresaDobavljaca = this.registerForm.value.adresaDobavljaca;
                            this.dobavljac.brojZiroRacuna = this.registerForm.value.brojZiroRacuna;
                            this.dobavljac.dobavljacID = this.registerForm.value.dobavljacID;
                            this.dobavljac.drzava = this.registerForm.value.drzava;
                            this.dobavljac.grad = this.registerForm.value.grad;
                            this.dobavljac.kontaktDobavljaca = this.registerForm.value.kontaktDobavljaca;
                            this.dobavljac.kontaktOsoba = this.registerForm.value.kontaktOsoba;
                            this.dobavljac.postanskiBroj = this.registerForm.value.postanskiBroj;
                            this.dobavljac.punNaziv = this.registerForm.value.punNaziv;
                            this.dobavljac.skraceniNaziv = this.registerForm.value.skraceniNaziv;
                            this.dobavljacService.addDobavljac(this.dobavljac).subscribe(result => {
                                this.router.navigate(['/login']);
                            });
                        }
                    });
                },
                error => {
                    this.loading = false;
                });
    }
}