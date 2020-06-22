import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.scss']
})
export class SingleTeamComponent implements OnInit {
  constructor(
    private fb: FormBuilder, private teamService: TeamService
  ) { }
  @Input() teamData : boolean;
  @Output() closeWindow = new EventEmitter();

  team;
  getTeamData() {
    this.team = this.teamData;
  }

  backFunc() {
    this.closeWindow.emit(this.teamData);
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
  this.teamService.edit(this.edit.value, this.team).subscribe(res => {
      if(res) {
          this.team = res;
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
    this.getTeamData();
  }

}
