import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenadzerService } from 'src/app/_services/menadzer.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {
  displayedColumns = ['ime', 'prezime', 'pol', 'datumRodjenja', 'adresaStanovanja', 'telefon', 'JMBG', 'datumZaposlenja', 'strucnaSprema', 'menadzer'];
  dataSource: MatTableDataSource<Prodavac>;
  prodavci: Prodavac[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public prodavacService: ProdavacService, public dialog: MatDialog, public snackBar: MatSnackBar,
    public menadzerService: MenadzerService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    var i = 0;
    this.prodavci = [];

    this.prodavacService.getProdavci().subscribe(data => {
      if (!Array.isArray(data)) return;
      var k = data.length;

      data.forEach(element => {
        var prodavac = new Prodavac();
        prodavac.JMBG = element.JMBG;
        prodavac.adresaStanovanja = element.adresaStanovanja;
        prodavac.datumRodjenja = element.datumRodjenja;
        prodavac.datumZaposlenja = element.datumZaposlenja;
        prodavac.ime = element.ime;
        prodavac.pol = element.pol;
        prodavac.prezime = element.prezime;
        prodavac.prodavacID = element.prodavacID;
        prodavac.strucnaSprema = element.strucnaSprema;
        prodavac.telefon = element.telefon;
        this.prodavci.push(prodavac);
 
        this.menadzerService.getMenadzer(element.prodavacID).subscribe(menadzer => {
          if (Array.isArray(menadzer)) this.prodavci[i].menadzer = menadzer[0];
          i++;

          if (k == i) {
            this.dataSource = new MatTableDataSource(this.prodavci);

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
      });
    }, error => this.showError(error));
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}