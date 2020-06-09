import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Racun } from 'src/app/_models/racun';
import { RacunService } from 'src/app/_services/racun.service';
import { Prodavac } from 'src/app/_models/prodavac';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  displayedColumns = ['vremeIzdavanja', 'mestoIzdavanja', 'ukupanIznosRacuna', 'nazivProdavnice', 'nacinPlacanja', 'brojRacuna', 'tipRacuna', 'prodavac', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  selektovanRacun: Racun;
  racuni: Racun[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public racunService: RacunService, public dialog: MatDialog, public prodavacService: ProdavacService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    var i = 0;
    this.racuni = [];

    this.racunService.getRacuni().subscribe(data => {
      if (!Array.isArray(data)) return;
      var k = data.length;

      data.forEach(element => {
        var racun = new Racun();
        racun.brojRacuna = element.brojRacuna;
        racun.mestoIzdavanja = element.mestoIzdavanja;
        racun.nacinPlacanja = element.nacinPlacanja;
        racun.nazivProdavnice = element.nazivProdavnice;
        racun.racunID = element.racunID;
        racun.tipRacuna = element.tipRacuna;
        racun.ukupanIznosRacuna = element.ukupanIznosRacuna;
        racun.vremeIzdavanja = element.vremeIzdavanja;
        this.racuni.push(racun);

        this.prodavacService.getProdavac(element.prodavacID).subscribe(prodavac => {
          this.racuni[i++].prodavac = prodavac[0];

          if (k == i) {
            this.dataSource = new MatTableDataSource(this.racuni);

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

  public openDialog(flag: number, racunID?: number,
    vremeIzdavanja?: Date,
    mestoIzdavanja?: string,
    ukupanIznosRacuna?: number,
    nazivProdavnice?: string,
    nacinPlacanja?: string,
    brojRacuna?: string,
    tipRacuna?: string,
    prodavac?: Prodavac) {
    const dialogRef = this.dialog.open(RacunDialogComponent,
      {
        data: {
          i: racunID, racunID: racunID, vremeIzdavanja: vremeIzdavanja, mestoIzdavanja: mestoIzdavanja, ukupanIznosRacuna: ukupanIznosRacuna,
          nazivProdavnice: nazivProdavnice, nacinPlacanja: nacinPlacanja, brojRacuna: brojRacuna, tipRacuna: tipRacuna
          , prodavac: prodavac
        }
      }
    );

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) this.loadData();
    });
  }

  selectRow(row: Racun) {
    this.selektovanRacun = row;
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}