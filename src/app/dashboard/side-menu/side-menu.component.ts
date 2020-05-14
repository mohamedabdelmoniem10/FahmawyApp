import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private service: ServService) { }
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
  

  ngOnInit() {
    this.getOpenStatus();
  }

}
