import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

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
