import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private localStorage: LocalstorageService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.localStorage.get('token')) {
      if(this.localStorage.get('role') == 'admin') {
        'admin';
      }
      else if(this.localStorage.get('role') == 'user') {
        'user';
      }
      console.log('this is the getter of role from storage', this.localStorage.get('role'))
      
    }
    else {
      this.router.navigate(['/login'])
    }
  }
  
}
