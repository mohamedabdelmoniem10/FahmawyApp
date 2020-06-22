import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _HttpClient: HttpClient, private localStorage: LocalstorageService) { }

  /////////////////////////////////////////////////////////////////////////////////////////////

  getAllProjectsCat(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/project`);

  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  getAllProjects(id): Observable<any> {
    // console.log(this.authSer.currentUserValue['data']['api_token']);

    return this._HttpClient.get(`${environment.apiUrl}/api/projects/${this.localStorage.get('id')}/${id}`);
  }


  /////////////////////////////////////////////////////////////////////////////////////////

  deleteProject(index): Observable<any> {
    // console.log(this.authSer.currentUserValue['data']['api_token']);

    return this._HttpClient.delete(`${environment.apiUrl}/api/projects/${this.localStorage.get('id')}/${index}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });

  }

  /////////////////////////////////////////////////////////////////////////////////////////

  editProject(index, fd): Observable<any> {

    return this._HttpClient.post(`${environment.apiUrl}/api/projects/${this.localStorage.get('id')}/${index}`,
      fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });


  }
  ///////////////////////////////////////////////////////////////////////////////////////


  addNewProject(new_pfd): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}/api/projects/${this.localStorage.get('id')} `,
      new_pfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })

    });
  }





}
