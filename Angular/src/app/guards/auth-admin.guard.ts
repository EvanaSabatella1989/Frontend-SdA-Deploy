import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private route: Router
  ){}

  canActivate(): boolean {
    const token = this.tokenService.isValidToken()
    console.log('authGuard')
    if(!token){
      this.route.navigate(['/login'])
      return false
    }
    const is_admin = this.tokenService.isAdmin()
    if(is_admin){
      return true;
    }else{
      this.route.navigate(['/home'])
      return false
  }
  }
  
}
