import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServService } from 'src/app/serv.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  
  @Output() registerWindow = new EventEmitter();

  constructor(private fb: FormBuilder, private service: ServService, private router: Router, private localStorage: LocalstorageService) { }



  
  register = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    password_confirmation: ['', Validators.required]
  })
  // name = this.register.value.name
  
  get name(){
    return this.register.get('name');
  }
  get email(){
    return this.register.get('email');
  }
  get password(){
    return this.register.get('password');
  }
  get password_confirmation(){
    return this.register.get('password_confirmation');
  }
  typical = true;
  removeTypicalAlert = false;
  confirmed() {
    this.removeTypicalAlert = false;
    if(this.password.value == this.password_confirmation.value ) {
      setTimeout(() => {
      console.log('this is the confirmation pass after two second', this.password_confirmation.value)
      this.removeTypicalAlert = true;
      }, 2000);
      console.log('this is the confirmation pass 1', this.password_confirmation.value)
      return this.typical = true;
    }else {
      console.log('this is the confirmation pass 2', this.password_confirmation.value)
      return this.typical = false;
    }
  }

  result;
  errMsg;
  registerFunc() {

    this.register.markAllAsTouched();
    console.log(this.register)
    if(!this.name.invalid && !this.email.invalid && !this.password_confirmation.invalid && !this.password.invalid){
      this.service.register(this.register.value).subscribe(res => {
        console.log('this is the result of the response', res)
        if(res) {
            this.result = res;
            this.registerWindow.emit('false');
          }
        },
        error => {
          if(error.status == 400) {
            this.errMsg = 'Invalid Email Or Password'
            this.register.reset();
          }
        })
    }else {
        this.register.reset();
        console.log('the form is in valid')
    }

  }


  backFunc() {
    this.registerWindow.emit('true');
  }

  ngOnInit() {
  }

}
