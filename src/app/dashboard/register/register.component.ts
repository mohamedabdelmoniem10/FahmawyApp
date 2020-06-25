import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServService } from 'src/app/serv.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{


  
  @Output() registerWindow = new EventEmitter();

  constructor(
    private fb: FormBuilder, 
    private service: ServService, 
    private router: Router, 
    private localStorage: LocalstorageService, 
    private teamService: TeamService,
    private renderer: Renderer2
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




  createTeamMember() {
    return this.fb.group({
      member_name: ['', Validators.required],
    });
  }
  createTeamSkill() {
    return this.fb.group({
      skill_name: ['', Validators.required],
    });
  }
  
  

  registerTeam = this.fb.group({
    team_title: ['', Validators.required],
    bio: ['', Validators.required],
    photo: ['', Validators.required],
    team_memebers: this.fb.array([this.createTeamMember()]),
    team_skills: this.fb.array([this.createTeamSkill()])
  })

  get teamTitle(){
    return this.registerTeam.get('team_title');
  }
  get teamBio(){
    return this.registerTeam.get('bio');
  }
  get teamMembers(){
    return this.registerTeam.get('team_memebers') as FormArray;
  }
  get teamSkills(){
    return this.registerTeam.get('team_skills') as FormArray;
  }
  image;
  uploadImgFunc(e) {
    this.image =  e.target.files[0];
  }

  // this for add team 

  addMemberField() {
    this.teamMembers.push(this.createTeamMember());
  }
  
  
  
  addSkillField() {
    this.teamSkills.push(this.createTeamSkill());
  }
  


  registerTeamFunc() {
    let fd = new FormData;
    fd.append('team_title', this.teamTitle.value);
    fd.append('bio', this.teamBio.value);
    fd.append('team_members', this.teamMembers.value);
    fd.append('team_skills', this.teamSkills.value);
    fd.append('photo', this.image);
    fd.append('company', this.localStorage.get('id'));
    console.log('this is the value of the form pinding', fd);
    this.teamService.AddTeam(fd).subscribe(res => {
      console.log('this is the response from adding team ', res)
      this.registerWindow.emit('false');
    });
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












