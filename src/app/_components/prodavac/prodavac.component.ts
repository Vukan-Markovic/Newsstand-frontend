import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { ProdavacDialogComponent } from '../dialogs/prodavac-dialog/prodavac-dialog.component';

@Component({
  selector: 'app-prodavac',
  templateUrl: './prodavac.component.html',
  styleUrls: ['./prodavac.component.css']
})
export class ProdavacComponent implements OnInit {
  displayedColumns = ['ime', 'prezime', 'pol', 'datumRodjenja', 'adresaStanovanja', 'telefon', 'JMBG', 'datumZaposlenja', 'strucnaSprema', 'actions'];
  dataSource: MatTableDataSource<Prodavac>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public prodavacService: ProdavacService, public dialog: MatDialog) { }

  ngOnInit() { }

  public loadData() {
    this.prodavacService.getProdavci().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        return data[property].toLocaleLowerCase();
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number,   prodavacID: number,
    ime: string,
    prezime: string,
    pol: string,
    datumRodjenja: string,
    adresaStanovanja: string,
    telefon: string,
    JMBG: string,
    datumZaposlenja: string,
    strucnaSprema: string) {
    const dialogRef = this.dialog.open(ProdavacDialogComponent, {
      data: {
        i: prodavacID, id: prodavacID, ime: ime, prezime: prezime, pol: pol,
        datumRodjenja: datumRodjenja, adresaStanovanja: adresaStanovanja, telefon: telefon, JMBG: JMBG
        , datumZaposlenja: datumZaposlenja, strucnaSprema: strucnaSprema
      }
    });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}