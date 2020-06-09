import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { FormControl, Validators } from '@angular/forms';
import { KorisnikService } from 'src/app/_services/korisnik.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {
  public flag: number;
  PIB = new FormControl('', [Validators.min(100000010), Validators.max(999999999)]);

  ngOnInit() {
    if (this.flag == 3) this.PIB.disable();
  }

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dobavljac, public dobavljacService: DobavljacService,
    public korisnikService: KorisnikService) { }

  public update() {
    this.dobavljacService.updateDobavljac(this.data.dobavljacID, this.data).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.dobavljacService.deleteDobavljac(this.data.dobavljacID).subscribe(d => {
      this.korisnikService.deleteKorisnik(this.data.dobavljacID).subscribe(
        data => {
          this.showSuccess(data);
          this.dialogRef.close(1);
        }, error => this.showError(error));
    }, error => this.showError(error));
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  showSuccess(data) {
    this.snackBar.open(data['message'], "U redu", {
      duration: 2500,
    });
  }
}