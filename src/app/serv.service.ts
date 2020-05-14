import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServService {


  constructor(private http: HttpClient) { }


  private sidebarOpeneSource = new BehaviorSubject(false);
  isOpened = this.sidebarOpeneSource.asObservable();
  updateOpened(status) {
    this.sidebarOpeneSource.next(status);
  }











delete(id) {
  return this.http.delete('https://reqres.in/api/users/' + id)
}



  getAllUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

}
