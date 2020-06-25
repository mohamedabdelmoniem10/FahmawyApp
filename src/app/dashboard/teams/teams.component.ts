import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localstorage.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private teamService: TeamService) { }


  teams;
teamsFunc() {
  this.teamService.getTeams().subscribe(res => {
    this.teams = res;
  });
}

singleTeam;
view(team) {
  this.singleTeam = team;
  console.log('this is the team ', team);
}
closeWindow() {
  this.singleTeam = false;
}

add() {
  // here is where to add form
}
registeration;
openRegisterForm() {
  this.registeration = true;
}
registerationFalse(event) {
  this.registeration = false;
  if(event == "false") {
    this.teamsFunc();
  }
}


delete(team) {
  this.teamService.deleteTeam(team).subscribe(res => {
    console.log('this is the response from delete method', res)
    this.teamsFunc();

  })
}


  ngOnInit() {
    this.teamsFunc();
  }

}
