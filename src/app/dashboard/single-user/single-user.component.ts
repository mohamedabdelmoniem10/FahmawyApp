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
  this.back.emit('true');
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

result;
errMsg;
editedFields = { };
obj = {};
keysArr = [];
valArr = [];
editFunc() {
  this.edit.markAllAsTouched();
  let keyValue = Object.entries(this.edit.controls).filter(value => value[1].dirty);
  for(let i = 0; i< keyValue.length; i++) {
    let key = keyValue[i][0];
    this.editedFields = {
      [key]: this.edit.value[key],
    };
    this.keysArr.push(key);
    this.valArr.push(this.edit.value[key]);
    [key] = Object.keys(this.obj);
    this.edit.value[key] = Object.values(this.obj);
  }
  this.keysArr = Object.keys(this.editedFields);
  this.valArr = Object.values(this.editedFields);
  console.log('this is the keys', this.keysArr);
  console.log('this is the values', this.valArr);
  console.log('this is the obj', this.obj)
  console.log('this is the form data ', this.editedFields)
  this.service.edit(this.editedFields, this.userData.id).subscribe(res => {
    console.log('this is the result of the response', res)
    if(res) {
        this.result = res;
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
