import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

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

  admin;
  isAdmin() {
    this.admin = this.localStorage.get('role');
  }

  role = this.localStorage.get('role');
  isHere() {
    if(this.role == 'admin') {
      if(this.router.url == '/' || this.router.url == '/dashboard' || this.router.url == '/users') {  
        console.log('this from the first if', this.router.url)
        return true;
      }else{
        console.log('this from the first else', this.router.url)
        this.router.navigate(['/dashboard']);
      }
    }else {
        if(this.router.url == '/profile' || this.router.url == '/categories' || this.router.url == '/services' || this.router.url == '/projects' || this.router.url == '/teams') {
        console.log('this from the second if', this.router.url)
        return true;
        }else{
        console.log('this from the second else', this.router.url)
        this.router.navigate(['/profile']);
        }
    }
  }
  
  ngOnInit() {
    this.getOpenStatus();
    this.isAdmin();
  }

}
