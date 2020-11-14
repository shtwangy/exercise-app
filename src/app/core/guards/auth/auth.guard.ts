import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const login = this.localStorageService.retrieve('login');
    if (login && !this.authService.isSignedIn) {
      this.authService.signIn(login.email, login.password).subscribe(res => {
        return true;
      });
    } else if (this.authService.isSignedIn) {
      return true;
    } else {
      this.router.navigate(['/users/sign_in']);
      return false;
    }
  }
}
