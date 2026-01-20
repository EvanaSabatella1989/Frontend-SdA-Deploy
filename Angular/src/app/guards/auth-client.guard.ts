import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
  constructor(
    // private tokenService: TokenService,
    private route: Router,
    private authService: AuthService,
  ){}


  canActivate(): boolean {
  // const tokenValid = this.tokenService.isValidToken();
  const tokenValid = this.authService.isValidToken();
  console.log('auth-client-guard', tokenValid);

  if (!tokenValid) {
    this.route.navigate(['/login']);
    return false;
  }

  // const isAdmin = this.tokenService.isAdmin();
  const isAdmin = this.authService.getIsAdmin();

  if (!isAdmin) {
    return true; // cliente
  } else {
    this.route.navigate(['/cms']);
    return false;
  }
}
  
}
