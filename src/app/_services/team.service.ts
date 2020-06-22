import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private localStorage: LocalstorageService) { }



getTeams() {  
  return this.http.get(`${environment.apiUrl}/api/teams_info/${this.localStorage.get('id')}`)
}
edit(param, team) {
  return this.http.put(`${environment.apiUrl}/api/teams/${team.company}/${team.id}`, param,  {headers: new HttpHeaders({
    'Authorization': `Bearer ${this.localStorage.get('token')}`,
    'Content-Type': 'application/json',
  })});
}
deleteTeam(team){
  return this.http.delete(`${environment.apiUrl}/api/teams/${team.company}/${team.id}`, {headers: new HttpHeaders({
    'Authorization': `Bearer ${this.localStorage.get('token')}`,
    'Content-Type': 'application/json',
  })});
}


}
