import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private route: Router
  ){}

  canActivate(): boolean {
    const token = this.tokenService.isValidToken()
    console.log('tokenValid', token)
    const is_admin = this.tokenService.isAdmin()
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
