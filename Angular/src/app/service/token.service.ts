import { Injectable } from '@angular/core';
import {setCookie, getCookie, removeCookie} from 'typescript-cookie'
import jwt_decoded, { JwtPayload } from 'jwt-decode';

interface Jwt extends JwtPayload {
  is_admin?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // createToken(token: string) {
  //   setCookie('token', token, {expires:365, path:"/"})
  // }

  // getToken() {
  //   const token = getCookie('token');
  //   return token;
  // }

  // removeToken() {
  //   removeCookie('token')
  // }

  // isValidToken() {
  //   const token = this.getToken()
  //   if(!token){
  //     return false
  //   }
  //   const decodeToken = jwt_decoded<JwtPayload>(token)
  //   console.log(decodeToken)
  //   if(decodeToken && decodeToken.exp){
  //     const tokenDate = new Date(0);
  //     tokenDate.setUTCSeconds(decodeToken.exp)
  //     const today = new Date()
  //     return tokenDate.getTime() > today.getTime()
  //   }
  //   return false
  // }

  // isAdmin() {
  //   const token = this.getToken()
    
  //   if(!token){
  //     return false
  //   }
  //   const decodeToken = jwt_decoded<Jwt>(token);

  //   if(decodeToken && decodeToken.is_admin){
  //     return true
  //   }
    
  //   return false
   
  // }

  createToken(token: string) {
    setCookie('token', token, { expires: 365, path: "/" });

    // Decodificar el token y guardar is_admin en localStorage
    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      localStorage.setItem('is_admin', decodedToken.is_admin ? 'true' : 'false');
    }
  }

  getToken(): string | null {
    return getCookie('token') || null; // Si es undefined, devuelve null
  }

  removeToken() {
    removeCookie('token');
    localStorage.removeItem('is_admin'); // Eliminar is_admin al cerrar sesión
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      return tokenDate.getTime() > new Date().getTime();
    }
    return false;
  }

  isAdmin(): boolean {
    // Verificar en localStorage en lugar de decodificar siempre
    return localStorage.getItem('is_admin') === 'true';
  }

  private decodeToken(token: string): Jwt | null {
    try {
      return jwt_decoded<Jwt>(token);
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  }
}
