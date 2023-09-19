import { Component,OnInit, ViewChild } from '@angular/core';
import {AddPurchaseComponent} from './add-purchase/add-purchase.component';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseService } from './services/purchase.service';
import { CoreService } from './core/core.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'purchase-history';
  displayedColumns: string[] = [
     'purchaseId',
     'name',
     'email',
     'purchaseAmount',
     'rewardsPoints',
     'createdDate',
     'action'

   ];

  dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _purchaseService: PurchaseService,
    private _coreService: CoreService

  ) {}

  ngOnInit(): void {
     this.getPurchaseList();
   }
  openAddPurchaseForm() {
    const dialogRef = this._dialog.open(AddPurchaseComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPurchaseList();
        }
      },
    });
  }

getPurchaseList() {
   this._purchaseService.getPurchaseList().subscribe({
     next: (res) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     },
     error: console.log,
   });
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openEditForm(data: any) {
  const dialogRef = this._dialog.open(AddPurchaseComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getPurchaseList();
      }
    },
  });
}


deleteEmployee(id: number) {
   this._purchaseService.deletePurchase(id).subscribe({
     next: (res) => {
       this._coreService.openSnackBar('Purchase deleted!', 'done');
       this.getPurchaseList();
     },
     error: console.log,
   });
 }

}
