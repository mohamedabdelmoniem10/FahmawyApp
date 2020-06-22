import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServService {


  constructor(private http: HttpClient, private localStorage: LocalstorageService) { }


  private sidebarOpeneSource = new BehaviorSubject(false);
  isOpened = this.sidebarOpeneSource.asObservable();
  updateOpened(status) {
    this.sidebarOpeneSource.next(status);
  }

  private isLoggedInSource = new BehaviorSubject(
    this.localStorage.get('token')
  );
  isLoggedIn = this.isLoggedInSource.asObservable();
  updateLoggedIn(status) {
    this.isLoggedInSource.next(status);
  }

  









  delete(id) {
    for (let i = 0; i < id.length-1; i++) {
      this.http.delete(`${environment.apiUrl}/api/users/${id[i]}`, {headers: new HttpHeaders({
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
        'Content-Type': 'application/json',
      })}); 
    }
    return this.http.delete(`${environment.apiUrl}/api/users/${id[id.length-1]}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })}); 
  }

  login(param) {
    return this.http.post(`${environment.apiUrl}/api/login`, param);
  }
  register(param) {
    console.log('this is the param from registeration', param)
    return this.http.post(`${environment.apiUrl}/api/register`, param, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })});
  }

  edit(param, id) {
    return this.http.put(`${environment.apiUrl}/api/users/${id}`, param, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })})
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/api/users`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })});
  }
  getSingleUser(param) {
    return this.http.get(`${environment.apiUrl}/api/users/${param}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })});
  }





  getStatistices() {
    return this.http.get(`${environment.apiUrl}/api/statistics/2020`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get('token')}`,
      'Content-Type': 'application/json',
    })})
  }



}
