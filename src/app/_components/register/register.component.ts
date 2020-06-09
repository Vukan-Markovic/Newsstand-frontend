import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { KorisnikService } from '../../_services/korisnik.service';
import { Korisnik } from 'src/app/_models/korisnik';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private korisnikService: KorisnikService, private prodavacService: ProdavacService, public snackBar: MatSnackBar,
        private menadzerService: MenadzerService, private dobavljacService: DobavljacService) {
    }

    ngOnInit() {
        if (this.authenticationService.isLoggedIn()) this.router.navigate(['/']);

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            lozinka: ['', [Validators.required, Validators.minLength(8)]],
            passwordRepeat: ['', [Validators.required, Validators.minLength(8)]],
            uloga: ['', Validators.required],
            skraceniNaziv: ['', Validators.nullValidator],
            punNaziv: ['', Validators.nullValidator],
            kontaktDobavljaca: ['', Validators.nullValidator],
            adresaDobavljaca: ['', Validators.nullValidator],
            grad: ['', Validators.nullValidator],
            drzava: ['', Validators.nullValidator],
            postanskiBroj: ['', Validators.nullValidator],
            PIB: ['', Validators.nullValidator],
            kontaktOsoba: ['', Validators.nullValidator],
            brojZiroRacuna: ['', Validators.nullValidator],
            ime: ['', Validators.nullValidator],
            prezime: ['', Validators.nullValidator],
            pol: ['', Validators.nullValidator],
            datumRodjenja: ['', Validators.nullValidator],
            adresaStanovanja: ['', Validators.nullValidator],
            telefon: ['', Validators.nullValidator],
            JMBG: ['', Validators.nullValidator],
            datumZaposlenja: ['', Validators.nullValidator],
            strucnaSprema: ['', Validators.nullValidator],
            adresaKancelarije: ['', Validators.nullValidator],
            brojKancelarije: ['', Validators.nullValidator]
        });

        this.registerForm.get('uloga').valueChanges.subscribe(val => {
            if (val == 'prodavac' || val == 'menadžer') {
                this.registerForm.controls['skraceniNaziv'].clearValidators();
                this.registerForm.controls['skraceniNaziv'].updateValueAndValidity();
                this.registerForm.controls['kontaktDobavljaca'].clearValidators();
                this.registerForm.controls['kontaktDobavljaca'].updateValueAndValidity();
                this.registerForm.controls['adresaDobavljaca'].clearValidators();
                this.registerForm.controls['adresaDobavljaca'].updateValueAndValidity();
                this.registerForm.controls['postanskiBroj'].clearValidators();
                this.registerForm.controls['postanskiBroj'].updateValueAndValidity();
                this.registerForm.controls['PIB'].clearValidators();
                this.registerForm.controls['PIB'].updateValueAndValidity();
                this.registerForm.controls['brojZiroRacuna'].clearValidators();
                this.registerForm.controls['brojZiroRacuna'].updateValueAndValidity();

                this.registerForm.controls['ime'].setValidators([Validators.required]);
                this.registerForm.controls['ime'].updateValueAndValidity();
                this.registerForm.controls['prezime'].setValidators([Validators.required]);
                this.registerForm.controls['prezime'].updateValueAndValidity();
                this.registerForm.controls['pol'].setValidators([Validators.required]);
                this.registerForm.controls['pol'].updateValueAndValidity();
                this.registerForm.controls['datumRodjenja'].setValidators([Validators.required]);
                this.registerForm.controls['datumRodjenja'].updateValueAndValidity();
                this.registerForm.controls['JMBG'].setValidators([Validators.required]);
                this.registerForm.controls['JMBG'].updateValueAndValidity();
                this.registerForm.controls['datumZaposlenja'].setValidators([Validators.required]);
                this.registerForm.controls['datumZaposlenja'].updateValueAndValidity();

                if (val == 'menadžer') {
                    this.registerForm.controls['adresaKancelarije'].setValidators([Validators.required]);
                    this.registerForm.controls['adresaKancelarije'].updateValueAndValidity();
                }
            } else if (val == 'dobavljac') {
                this.registerForm.controls['ime'].clearValidators();
                this.registerForm.controls['ime'].updateValueAndValidity();
                this.registerForm.controls['prezime'].clearValidators();
                this.registerForm.controls['prezime'].updateValueAndValidity();
                this.registerForm.controls['pol'].clearValidators();
                this.registerForm.controls['pol'].updateValueAndValidity();
                this.registerForm.controls['datumRodjenja'].clearValidators();
                this.registerForm.controls['datumRodjenja'].updateValueAndValidity();
                this.registerForm.controls['JMBG'].clearValidators();
                this.registerForm.controls['JMBG'].updateValueAndValidity();
                this.registerForm.controls['datumZaposlenja'].clearValidators();
                this.registerForm.controls['datumZaposlenja'].updateValueAndValidity();
                this.registerForm.controls['adresaKancelarije'].clearValidators();
                this.registerForm.controls['adresaKancelarije'].updateValueAndValidity();

                this.registerForm.controls['skraceniNaziv'].setValidators([Validators.required]);
                this.registerForm.controls['skraceniNaziv'].updateValueAndValidity();
                this.registerForm.controls['kontaktDobavljaca'].setValidators([Validators.required]);
                this.registerForm.controls['kontaktDobavljaca'].updateValueAndValidity();
                this.registerForm.controls['adresaDobavljaca'].setValidators([Validators.required]);
                this.registerForm.controls['adresaDobavljaca'].updateValueAndValidity();
                this.registerForm.controls['postanskiBroj'].setValidators([Validators.required]);
                this.registerForm.controls['postanskiBroj'].updateValueAndValidity();
                this.registerForm.controls['PIB'].setValidators([Validators.required, Validators.min(100000010), Validators.max(999999999)]);
                this.registerForm.controls['PIB'].updateValueAndValidity();
                this.registerForm.controls['brojZiroRacuna'].setValidators([Validators.required]);
                this.registerForm.controls['brojZiroRacuna'].updateValueAndValidity();
            }
        });
    }

    isProdavac() {
        if (this.registerForm.value.uloga == 'prodavac') {
            this.removeClass();
            return true;
        }

        return false;
    }

    isMenadzer() {
        if (this.registerForm.value.uloga == 'menadžer') {
            this.removeClass();
            return true;
        }

        return false;
    }

    isDobavljac() {
        if (this.registerForm.value.uloga == 'dobavljac') {
            this.removeClass();
            return true;
        }

        return false;
    }

    removeClass() {
        const el = document.querySelector('#register');
        if (el.classList.contains("height")) el.classList.remove("height");
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) return;

        if (!(this.registerForm.value.lozinka === this.registerForm.value.passwordRepeat)) {
            this.snackBar.open("Lozinke moraju da se podudaraju!", "U redu", {
                duration: 2000,
                panelClass: ['red-snackbar']
            });

            return;
        }

        if ((this.registerForm.value.uloga == 'prodavac' || this.registerForm.value.uloga == 'menadžer') && (this.registerForm.value.datumRodjenja >= this.registerForm.value.datumZaposlenja)) {
            this.snackBar.open("Datum rođenja mora biti pre datuma zaposlenja!", "U redu", {
                duration: 2000,
                panelClass: ['red-snackbar']
            });

            return;
        }

        this.korisnikService.getKorisnikByEmail(this.registerForm.value.email).subscribe(data => {
            if (data[0]) {
                this.snackBar.open("Već postoji kreiran nalog sa datom email adresom!", "U redu", {
                    duration: 2000,
                    panelClass: ['red-snackbar']
                });

                return
            }

            this.loading = true;
            this.korisnik.email = this.registerForm.value.email;
            this.korisnik.lozinka = this.registerForm.value.lozinka;
            this.korisnik.uloga = this.registerForm.value.uloga;

            this.authenticationService.register(this.korisnik)
                .pipe(first())
                .subscribe(
                    d => {
                        this.snackBar.open(d['message'], "U redu", {
                            duration: 2000
                        });
                        this.korisnikService.getKorisnikByEmail(this.korisnik.email).subscribe(data => {
                            if (this.korisnik.uloga == 'prodavac' || this.korisnik.uloga == 'menadžer') {
                                this.prodavac.JMBG = this.registerForm.value.JMBG;
                                this.prodavac.adresaStanovanja = this.registerForm.value.adresaStanovanja;
                                var d1 = new Date(this.registerForm.value.datumRodjenja);
                                var d2 = new Date(this.registerForm.value.datumZaposlenja);
                                d1.setHours(12, 0, 0);
                                d2.setHours(12, 0, 0);
                                this.prodavac.datumRodjenja = d1;
                                this.prodavac.datumZaposlenja = d2;
                                this.prodavac.ime = this.registerForm.value.ime;
                                this.prodavac.pol = this.registerForm.value.pol;
                                this.prodavac.prezime = this.registerForm.value.prezime;
                                this.prodavac.prodavacID = data[0].korisnikID;
                                this.prodavac.strucnaSprema = this.registerForm.value.strucnaSprema;
                                this.prodavac.telefon = this.registerForm.value.telefon;

                                this.prodavacService.addProdavac(this.prodavac).subscribe(res => {
                                    if (this.korisnik.uloga == 'menadžer') {
                                        this.menadzer.adresaKancelarije = this.registerForm.value.adresaKancelarije;
                                        this.menadzer.brojKancelarije = this.registerForm.value.brojKancelarije;
                                        this.menadzer.menadzerID = data[0].korisnikID;
                                        this.menadzerService.addMenadzer(this.menadzer).subscribe(r => {
                                            this.router.navigate(['/login']);
                                        }, error => {
                                            this.loading = false;
                                            this.showError(error);
                                        });
                                    }
                                    this.router.navigate(['/login']);
                                }, error => {
                                    this.loading = false;
                                    this.showError(error);
                                });
                            } else {
                                this.dobavljac.PIB = this.registerForm.value.PIB;
                                this.dobavljac.adresaDobavljaca = this.registerForm.value.adresaDobavljaca;
                                this.dobavljac.brojZiroRacuna = this.registerForm.value.brojZiroRacuna;
                                this.dobavljac.dobavljacID = data[0].korisnikID;
                                this.dobavljac.drzava = this.registerForm.value.drzava;
                                this.dobavljac.grad = this.registerForm.value.grad;
                                this.dobavljac.kontaktDobavljaca = this.registerForm.value.kontaktDobavljaca;
                                this.dobavljac.kontaktOsoba = this.registerForm.value.kontaktOsoba;
                                this.dobavljac.postanskiBroj = this.registerForm.value.postanskiBroj;
                                this.dobavljac.punNaziv = this.registerForm.value.punNaziv;
                                this.dobavljac.skraceniNaziv = this.registerForm.value.skraceniNaziv;
                                this.dobavljacService.addDobavljac(this.dobavljac).subscribe(result => {
                                    this.router.navigate(['/login']);
                                }, error => {
                                    this.loading = false;
                                    this.showError(error);
                                });
                            }
                        }, error => {
                            this.loading = false;
                            this.showError(error);
                        });
                    }, error => {
                        this.loading = false;
                        this.showError(error);
                    });
        }, error => {
            this.loading = false;
            this.showError(error);
        });
    }

    showError(error) {
        this.snackBar.open(error, "U redu", {
            duration: 2000,
            panelClass: ['red-snackbar']
        });
    }
}