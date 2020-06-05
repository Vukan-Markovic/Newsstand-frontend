import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Izvestaj } from 'src/app/_models/izvestaj';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { IzvestajDialogComponent } from '../dialogs/izvestaj-dialog/izvestaj-dialog.component';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.css']
})
export class IzvestajComponent implements OnInit {
  displayedColumns = ['promet', 'brojKupovina', 'datumOd', 'datumDo', 'menadzer', 'actions'];
  dataSource: MatTableDataSource<Izvestaj>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  i: number = 0;
  k: number = 0;
  izvestaji: Izvestaj[] = [];

  constructor(public izvestajService: IzvestajService, public dialog: MatDialog, public prodavacService: ProdavacService,
    public menadzerService: MenadzerService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.i = 0;
    this.izvestaji = [];

    this.izvestajService.getIzvestaji().subscribe(data => {
      if (!Array.isArray(data)) return;
      this.k = data.length;

      data.forEach(element => {
        var izvestaj = new Izvestaj();
        izvestaj.brojKupovina = element.brojKupovina;
        izvestaj.datumDo = element.datumDo;
        izvestaj.datumOd = element.datumOd;
        izvestaj.izvestajID = element.izvestajID;
        izvestaj.promet = element.promet;
        this.izvestaji.push(izvestaj);

        this.menadzerService.getMenadzer(element.menadzerID).subscribe(menadzer => {
          this.izvestaji[this.i].menadzer = menadzer[0];

          this.prodavacService.getProdavac(element.menadzerID).subscribe(prodavac => {
            this.izvestaji[this.i].menadzer.prodavac = prodavac[0];
            this.i++;

            if (this.k == this.i) {
              this.dataSource = new MatTableDataSource(this.izvestaji);

              this.dataSource.filterPredicate = (data, filter: string) => {
                const accumulator = (currentTerm, key: string) => {
                  return key === 'menadzer' ? currentTerm + data.menadzer.adresaKancelarije : currentTerm + data[key];
                };

                const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                const transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
              };

              this.dataSource.sortingDataAccessor = (data, property) => {
                if (data[property]) {
                  switch (property) {
                    case 'menadzer': return data.menadzer.adresaKancelarije.toLocaleLowerCase();
                    default: return typeof data[property] == "string" ? data[property].toLocaleLowerCase() : data[property];
                  }
                }
              };

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }, error => this.showError(error));
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

  public openDialog(flag: number, izvestajID?: number,
    datumOd?: Date,
    datumDo?: Date,
    menadzerID?: number) {
    const dialogRef = this.dialog.open(IzvestajDialogComponent, {
      data: {
        i: izvestajID, izvestajID: izvestajID, datumOd: datumOd,
        datumDo: datumDo, menadzerID: menadzerID
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