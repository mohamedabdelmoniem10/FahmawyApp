import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatRippleModule, MatListModule, MatInputModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatDividerModule, MatDialogModule, MatSnackBarModule } from '@angular/material'

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatRippleModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDividerModule,
  MatDialogModule,
  MatSnackBarModule
]

@NgModule({
  imports: [ 
    material
   ],
  exports: [
    material
   ]
})
export class MaterialModule { }
