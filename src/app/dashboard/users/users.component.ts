import { Component, OnInit, ViewChild } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatPaginator } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/confirm-delete/confirm-delete.component';
import { LocalstorageService } from 'src/app/localstorage.service';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersComponent implements OnInit {

  usersData;
  selectedData = [];

  displayedColumns: string[] = ['select', 'id', 'email', 'name', 'role', 'search'];
  dataSource = new MatTableDataSource(this.usersData);
  selection = new SelectionModel(true, [])
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(private service: ServService, public dialog: MatDialog, private localStorage: LocalstorageService) { }

  usersIds = [];
  getUsersFromServ() {
    this.service.getAllUsers().subscribe(res => {
      this.usersData = res;
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.paginator = this.paginator;
    });
  }

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  // this.selectedData.push(this.selection.selected)
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
  this.selection.clear() :
  this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

selectedId = [];
selectedUserName = [];
deleteSelectedItem() {
  for(let i = 0; i < this.selection.selected.length; i++) {
    this.selectedId.push(this.selection.selected[i].id);
    this.selectedUserName.push(this.selection.selected[i].name)
    console.log('id:', this.selection.selected[i].id);

  }
  
  let dialogeRef = this.dialog.open(ConfirmDeleteComponent, {data: {names: this.selectedUserName}});
  
  dialogeRef.afterClosed().subscribe(res => {
    if(res == 'false') {
      this.selectedUserName = [];
      this.selectedId = [];
      this.selection.clear()
    }
    else if(res == 'true') {
      this.service.delete(this.selectedId).subscribe(res => {
        this.getUsersFromServ();
        this.selection.clear()
        this.selectedUserName = [];
        this.selectedId = [];
      });
    }
  })


}

singleUser;
view(row) {
  this.singleUser = row;
}



singleUserFalse(event) {
  
  let data : any  = this.dataSource.filteredData;
  console.log('data', data)
  for(let x = 0; x < data.length; x++) {
    if(data[x].id == event.id) {
      this.dataSource.filteredData[x] = event;
    }
  }
  this.dataSource = new MatTableDataSource(data);
  this.singleUser = false;
}


registeration;
openRegisterForm() {
  this.selection.clear()
  this.registeration = true;
}
registerationFalse(event) {
  this.registeration = false;
  if(event == "false") {
    this.getUsersFromServ();
  }
}


ngOnInit() {
    this.getUsersFromServ();
  }

}
