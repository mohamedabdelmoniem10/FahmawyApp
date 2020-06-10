import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/confirm-delete/confirm-delete.component';








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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(private service: ServService, public dialog: MatDialog) { }

  getUsersFromServ() {
    this.service.getAllUsers().subscribe(res => {
      this.usersData = res;
      console.log('this is the response from the server', res);
      this.dataSource = new MatTableDataSource(this.usersData);
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
  console.log('this is the selected data', this.selection.selected);
  for(let i = 0; i < this.selection.selected.length; i++) {
    this.selectedId.push(this.selection.selected[i].id);
    this.selectedUserName.push(this.selection.selected[i].name)
    console.log('id:', this.selection.selected[i].id);

  }
  
  let dialogeRef = this.dialog.open(ConfirmDeleteComponent, {data: {names: this.selectedUserName}});
  
  dialogeRef.afterClosed().subscribe(res => {
    console.log('this is the res from dialog', res);
    if(res == 'false') {
      this.selectedUserName = [];
      this.selectedId = [];
      this.selection.clear()
    }
    else if(res == 'true') {
      console.log('this.selectedId', this.selectedId)
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

  // this.service.getSingleUser(row.id).subscribe( res => {
  //   console.log(res);
  //   this.singleUser = res;
  // });
}


singleUserFalse(event) {
  console.log('this is from the single user component', event);
  this.singleUser = false;
}

registeration;
openRegisterForm() {
  this.selection.clear()
  this.registeration = true;
}
registerationFalse(event) {
  this.registeration = false;
  console.log('this is the event from register false', event)
  if(event == "false") {
    this.getUsersFromServ();
  }
}


ngOnInit() {
    this.getUsersFromServ();
  }

}
