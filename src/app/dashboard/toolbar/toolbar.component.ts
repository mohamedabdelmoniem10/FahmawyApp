import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private service: ServService, private localStorage: LocalstorageService, private router: Router) { }

  opened;
  open() {
    this.service.updateOpened(!this.opened);
    console.log('this is the res', this.opened)  
  }

  getOpenStatus() {
    this.service.isOpened.subscribe(res => {
      this.opened = res;
    })
  }



  logOut() {
    this.localStorage.remove('token');
    this.service.updateLoggedIn(false);
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getOpenStatus();
    
  }

}
