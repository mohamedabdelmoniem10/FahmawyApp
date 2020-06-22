import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient, private localStorage: LocalstorageService) { }


  addNewCategory(new_cfd): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')} `,
      new_cfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })

    });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  editCategory(index, edit_cfd): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/${index} `,
      edit_cfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })

    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  getServicesCat(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/service `);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getProjectsCat(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/project `);
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteCAT(index): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/api/categories/${this.localStorage.get('id')}/${index}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });
  }



}
