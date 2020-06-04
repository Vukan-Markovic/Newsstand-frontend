import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MatDialog } from '@angular/material/dialog';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {
  displayedColumns = ['skraceniNaziv', 'punNaziv', 'kontaktDobavljaca', 'adresaDobavljaca', 'grad', 'drzava', 'postanskiBroj', 'PIB', 'kontaktOsoba', 'brojZiroRacuna'];
  dataSource: MatTableDataSource<Dobavljac>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dobavljacService: DobavljacService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dobavljacService.getDobavljaci().subscribe(data => {
      if (!Array.isArray(data)) return;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        if (data[property]) return data[property].toLocaleLowerCase();
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        this.snackBar.open(error, "U redu", {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}