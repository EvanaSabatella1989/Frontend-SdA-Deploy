import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private route: Router
  ){}


  canActivate(): boolean {
    const token = this.tokenService.isValidToken();
    console.log('auth-client-guards')
    if(!token){
      this.route.navigate(['/login'])
      return false
    }
    const is_admin = this.tokenService.isAdmin()
    if (!is_admin) {
      return true
    } else{
      this.route.navigate(['/cms'])
      return false
    }
  }
  
}
