import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServService } from 'src/app/serv.service';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router, private localStorage: LocalstorageService, private service: ServService) {

   }

  login = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  })
  

  option; 
result;
errMsg
logIn() {
  this.service.login(this.login.value).subscribe(res => {
    if(res) {
      console.log('this is the result ', res)
      this.result = res;
      this.localStorage.set('token', this.result.data.api_token);
      this.router.navigate(['/dashboard']);
      this.service.updateLoggedIn(true);
    }
  },
  error => {
    if(error.status == 400) {
      this.errMsg = 'Invalid Email Or Password'
    }
  })
}

valid() {
  this.errMsg = false;
  console.log('done')
}

  ngOnInit() {
  }

}
