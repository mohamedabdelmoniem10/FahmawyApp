import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _HttpClient: HttpClient, private localStorage: LocalstorageService) { }




  /////////////////////////////////////////////////////////////////////////////////////////////

  getAllServicesCat(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/service`);

  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  getAllServices(id): Observable<any> {
    // console.log(this.localStorage.get('token'));

    return this._HttpClient.get(`${environment.apiUrl}/api/services/${this.localStorage.get('id')}/${id}`);
  }


  /////////////////////////////////////////////////////////////////////////////////////////

  deleteService(index): Observable<any> {
    // console.log(this.localStorage.get('token'));

    return this._HttpClient.delete(`${environment.apiUrl}/api/services/${this.localStorage.get('id')}/${index}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });

  }

  /////////////////////////////////////////////////////////////////////////////////////////



  editService(index, s_fd): Observable<any> {

    return this._HttpClient.post(`${environment.apiUrl}/api/services/${this.localStorage.get('id')}/${index}`,
      s_fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });


  }


  /////////////////////////////////////////////////////////////////////////////////////////


  addNewService(new_sfd): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}/api/services/${this.localStorage.get('id')} `,
      new_sfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })

    });
  }




}
