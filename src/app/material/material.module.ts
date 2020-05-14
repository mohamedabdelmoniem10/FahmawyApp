import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatRippleModule, MatListModule, MatInputModule, MatTableModule, MatCheckboxModule } from '@angular/material'

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatRippleModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatCheckboxModule
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
