import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyinfoService {

  constructor(private _httpClient: HttpClient, private localStorage: LocalstorageService) { }

  getCompanyInfo(): Observable<any> {
    // console.log('this the id from local storage', this.localStorage.get('id'))
    return this._httpClient.get(`${environment.apiUrl}/api/company_infs/${this.localStorage.get('id')}`);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  editProfile(profile_fd, id): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/company_infs/${this.localStorage.get('id')}/${id} `,
      profile_fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })

    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  deleteProfile(id): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/api/company_infs/${this.localStorage.get('id')}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.get('token')}`,
      })
    });

  }


}
