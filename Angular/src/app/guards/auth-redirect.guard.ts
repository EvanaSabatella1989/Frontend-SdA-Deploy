import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
// import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(
    // private tokenService: TokenService,
    private route: Router,
    private authService: AuthService,
  ){}

  canActivate(): boolean {
    const token = this.authService.isValidToken()
    console.log('tokenValid', token)
    const is_admin = this.authService.getIsAdmin()
    if(token){
      if(is_admin){
        this.route.navigate(["/cms"])
        return false
      }else{
        this.route.navigate(["/home"])
        return false
      }
    }

    return true
  }
  
}
