import { Component, OnInit } from '@angular/core';
import { ServService } from '../serv.service';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: ServService, private localStorage: LocalstorageService, private router: Router) { }

  

  loggedIn
  getLoggingStatus() {
    this.service.isLoggedIn.subscribe(res => {
      console.log('this is the res', res)
      this.loggedIn = res;
    })
  }
  ngOnInit() {
    this.getLoggingStatus();
  }

}
