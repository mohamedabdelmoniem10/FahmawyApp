import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServService } from 'src/app/serv.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit{


  
  @Output() registerWindow = new EventEmitter();

  constructor(
    private fb: FormBuilder, 
    private service: ServService, 
    private router: Router, 
    private localStorage: LocalstorageService, 
    private teamService: TeamService,
    private render: Renderer
  ) { }



  
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




  
  // this for add team 

  @ViewChild('newMemberField', {static: false}) memberFieldRef: ElementRef;
  @ViewChild('newSkillField', {static: false}) skillFieldRef: ElementRef;


  newMemberField;
  countMember = 1;
  teamMembersArr = [];

  
  addMemberField() {
    console.log('this is the team members arr', this.registerTeam);
    // this.registerTeam.value.team_members.push()
  }
  ngAfterViewInit() {
    this.addMemberField();  
  }
  
  newSkillField;
  countSkill = 1;
  teamSkillsArr = [];
  addSkillField() {
    this.newMemberField = `<input formControlName="team_skills${this.countSkill++}" [class.invalid]="bio.invalid" placeholder="please type team member ${this.countSkill++}" required>`
  }
  
  

  registerTeam = this.fb.group({
    team_title: ['', Validators.required],
    bio: ['', Validators.required],
    photo: ['', Validators.required],
    team_memebers: [[], Validators.required],
    team_skills: [[], Validators.required]
  })

  get teamTitle(){
    return this.registerTeam.get('team_title');
  }
  get teamBio(){
    return this.registerTeam.get('bio');
  }
  get teamMembers(){
    return this.registerTeam.get('team_memebers');
  }
  get teamSkills(){
    return this.registerTeam.get('team_skills');
  }
  image;
  uploadImgFunc(e) {
    this.image =  e.target.files[0];
  }


  registerTeamFunc() {
    let fd = new FormData;
    fd.append('team_title', this.teamTitle.value);
    fd.append('bio', this.teamBio.value);
    fd.append('team_members', this.teamMembers.value);
    fd.append('team_skills', this.teamSkills.value);
    fd.append('photo', this.image);
    this.teamService.AddTeam(fd).subscribe(res => {
      console.log('this is the response from adding team ', res)
    })
  }



  backFunc() {
    this.registerWindow.emit('true');
  }

  team;
  ngOnInit() {
    if(this.router.url == '/teams') {
      this.team = true;
    }
  }

}
