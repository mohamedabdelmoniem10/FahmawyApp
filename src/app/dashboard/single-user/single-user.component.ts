import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServService } from 'src/app/serv.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServService) { }

  

@Input() data : boolean;
@Output() back = new EventEmitter();

userData;
getUserData() {
  this.userData = this.data;
  console.log('this is data', this.userData)
}

backFunc() {
  this.back.emit(this.userData);
}


edit = this.fb.group({
  name: [''],
  email: ['', Validators.email],
  password: ['', Validators.minLength(8)],
  new_password: ['', Validators.minLength(8)]
})

get name() {
  return this.edit.get('name');
}
get email() {
  return this.edit.get('email');
}
get password() {
  return this.edit.get('password');
}
get new_password() {
  return this.edit.get('new_password');
}

errMsg;
editWindow
editFunc() {
  // this.edit.markAllAsTouched();
  

for(let key in this.edit.value) {
  if(!this.edit.value[key]) {
    delete this.edit.value[key];
  }
}
this.service.edit(this.edit.value, this.userData.id).subscribe(res => {
    if(res) {
        this.userData = res;
        this.edit.reset();
        this.editWindow = false;
      }
    },
    error => {
      if(error.status == 400) {
        this.errMsg = 'Invalid data'
        this.edit.reset();
      }
    })
  
}




  ngOnInit() {
    this.getUserData()
  }

}
