import { Component, OnInit, ViewChild } from '@angular/core';
import { Menadzer } from 'src/app/_models/menadzer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ZaposleniDialogComponent } from '../dialogs/zaposleni-dialog/zaposleni-dialog.component';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {
  displayedColumns = ['ime', 'prezime', 'pol', 'datumRodjenja', 'adresaStanovanja', 'telefon', 'JMBG', 'datumZaposlenja', 'strucnaSprema', 'adresaKancelarije', 'brojKancelarije'];
  dataSource: MatTableDataSource<Menadzer>;
  i: number = 0;
  k: number = 0;
  menadzeri: Menadzer[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public menadzerService: MenadzerService, public dialog: MatDialog, public snackBar: MatSnackBar,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.i = 0;
    this.menadzeri = [];

    this.menadzerService.getMenadzeri().subscribe(data => {
      if (!Array.isArray(data)) return;
      this.k = data.length;

      data.forEach(element => {
        var menadzer = new Menadzer();
        menadzer.adresaKancelarije = element.adresaKancelarije;
        menadzer.brojKancelarije = element.brojKancelarije;
        this.menadzeri.push(menadzer);

        this.prodavacService.getProdavac(element.menadzerID).subscribe(prodavac => {
          this.menadzeri[this.i++].prodavac = prodavac[0];

          if (this.k == this.i) {
            this.dataSource = new MatTableDataSource(this.menadzeri);

            this.dataSource.filterPredicate = (data, filter: string) => {
              const accumulator = (currentTerm, key: string) => {
                return key === 'prodavac' ? currentTerm + data.prodavac.ime : currentTerm + data[key];
              };

              const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
              const transformedFilter = filter.trim().toLowerCase();
              return dataStr.indexOf(transformedFilter) !== -1;
            };

            this.dataSource.sortingDataAccessor = (data, property) => {
              if (data[property]) {
                switch (property) {
                  case 'prodavac': return data.prodavac.ime.toLocaleLowerCase();
                  default: return typeof data[property] == "string" ? data[property].toLocaleLowerCase() : data[property];
                }
              }
            };

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }, error => this.showError(error));
      });
    }, error => this.showError(error));
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  public openDialog(flag: number, prodavacID: number,
    ime: string,
    prezime: string,
    pol: string,
    datumRodjenja: string,
    adresaStanovanja: string,
    telefon: string,
    JMBG: string,
    datumZaposlenja: string,
    strucnaSprema: string) {
    const dialogRef = this.dialog.open(ZaposleniDialogComponent, {
      data: {
        i: prodavacID, prodavacID: prodavacID, ime: ime, prezime: prezime, pol: pol,
        datumRodjenja: datumRodjenja, adresaStanovanja: adresaStanovanja, telefon: telefon, JMBG: JMBG
        , datumZaposlenja: datumZaposlenja, strucnaSprema: strucnaSprema
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
