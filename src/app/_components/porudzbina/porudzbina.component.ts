import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Porudzbina } from 'src/app/_models/porudzbina';
import { PorudzbinaService } from 'src/app/_services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {
  displayedColumns = ['datumPorucivanja', 'datumIsporuke', 'ukupanIznosPorudzbine', 'statusPorudzbine', 'dobavljac', 'menadzer', 'prodavac', 'actions'];
  dataSource: MatTableDataSource<Porudzbina>;
  i: number = 0;
  j: number = 0;
  k: number = 0;
  l: number = 0;
  isDobavljac = false;
  porudzbine: Porudzbina[] = [];
  selektovanaPorudzbina: Porudzbina;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public porudzbinaService: PorudzbinaService, public dialog: MatDialog,
    public authenticationService: AuthenticationService, public prodavacService: ProdavacService,
    public dobavljacService: DobavljacService, public menadzerService: MenadzerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue.uloga == 'dobavljac') this.isDobavljac = true;
    this.loadData();
  }

  public loadData() {
    this.i = 0, this.j = 0, this.l = 0;
    this.porudzbine = [];
    if (!this.isDobavljac) {
      this.porudzbinaService.getPorudzbine().subscribe(data => {
        this.fillTable(data);
      }, error => this.showError(error));
    } else {
      this.porudzbinaService.getPorudzbineForDobavljac(this.authenticationService.currentUserValue.korisnikID).subscribe(data => {
        this.fillTable(data);
      }, error => this.showError(error));
    }
  }

  fillTable(data) {
    if (!Array.isArray(data)) return;
    this.k = data.length;

    data.forEach(element => {
      var porudzbina = new Porudzbina();
      porudzbina.datumIsporuke = element.datumIsporuke;
      porudzbina.datumPorucivanja = element.datumPorucivanja;
      porudzbina.porudzbinaID = element.porudzbinaID;
      porudzbina.statusPorudzbine = element.statusPorudzbine;
      porudzbina.ukupanIznosPorudzbine = element.ukupanIznosPorudzbine;
      this.porudzbine.push(porudzbina);

      this.prodavacService.getProdavac(element.prodavacID).subscribe(prodavac => {
        this.porudzbine[this.i++].prodavac = prodavac[0];

        this.dobavljacService.getDobavljac(element.dobavljacID).subscribe(dobavljac => {
          this.porudzbine[this.j++].dobavljac = dobavljac[0];

          this.prodavacService.getProdavac(element.menadzerID).subscribe(menadzer => {
            this.porudzbine[this.l].menadzer = new Menadzer();
            this.porudzbine[this.l].menadzer.menadzerID = element.menadzerID;
            this.porudzbine[this.l].menadzer.prodavac = menadzer[0];
            this.l++;

            if (this.k == this.i && this.k == this.j && this.k == this.l) {
              this.dataSource = new MatTableDataSource(this.porudzbine);

              this.dataSource.filterPredicate = (data, filter: string) => {
                const accumulator = (currentTerm, key: string) => {
                  if (key === 'prodavac')
                    return currentTerm + data.prodavac.ime;
                  else if (key === 'menadzer')
                    return currentTerm + data.menadzer.prodavac.ime;
                  else if (key === 'dobavljac')
                    return currentTerm + data.dobavljac.skraceniNaziv;
                  return currentTerm + data[key];
                };

                const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                const transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
              };

              this.dataSource.sortingDataAccessor = (data, property) => {
                if (data[property]) {
                  switch (property) {
                    case 'prodavac': return data.prodavac.ime.toLocaleLowerCase();
                    case 'dobavljac': return data.dobavljac.skraceniNaziv.toLocaleLowerCase();
                    case 'menadzer': return data.menadzer.prodavac.ime.toLocaleLowerCase();
                    default: return typeof data[property] == "string" ? data[property].toLocaleLowerCase() : data[property];
                  }
                }
              };

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }, error => this.showError(error));
        }, error => this.showError(error));
      }, error => this.showError(error));
    });
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  public openDialog(flag: number, porudzbinaID?: number,
    datumPorucivanja?: Date,
    datumIsporuke?: Date,
    ukupanIznosPorudzbine?: number,
    statusPorudzbine?: string,
    dobavljac?: Dobavljac,
    menadzer?: Menadzer,
    prodavac?: Prodavac) {
    const dialogRef = this.dialog.open(PorudzbinaDialogComponent,
      {
        data: {
          i: porudzbinaID, porudzbinaID: porudzbinaID, datumPorucivanja: datumPorucivanja, datumIsporuke: datumIsporuke, ukupanIznosPorudzbine: ukupanIznosPorudzbine, statusPorudzbine: statusPorudzbine,
          dobavljac: dobavljac, menadzer: menadzer, prodavac: prodavac
        }
      }
    );

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) this.loadData();
    });
  }

  selectRow(row: Porudzbina) {
    this.selektovanaPorudzbina = row;
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}