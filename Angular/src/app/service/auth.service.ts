import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse extends Token {
  is_admin: boolean;
  // Traemos el nombre para manejar la sesión de usuario:
  first_name: string;
  id:number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private userNameSubject = new BehaviorSubject<string>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();  // Observable para escuchar cambios

  private isAdminSubject = new BehaviorSubject<boolean>(this.tokenService.isAdmin());
  isAdmin$ = this.isAdminSubject.asObservable();

  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, {
      email,
      password
    })
    .pipe(
      tap(resp => {
        console.log('Respuesta login:', resp);
        this.isLoggedInSubject.next(true); // Notifica que el usuario está logueado
        this.tokenService.createToken(resp.access_token);
        localStorage.setItem('user_id', resp.id.toString()); //para tarer el id del usuario
        // guardamos el nombre del usuario en el localStorage
        localStorage.setItem('first_name', resp.first_name);
        localStorage.setItem('token', resp.access_token) 
        localStorage.setItem('is_admin', resp.is_admin ? 'true' : 'false');

        this.userNameSubject.next(resp.first_name); // Notificamos el cambio
        this.isAdminSubject.next(resp.is_admin); // Notificar si es admin
      })
    )
  }

  register(first_name: string, last_name: string,email: string, password: string) {
    return this.http.post(`${this.apiUrl}/registro/`, {
      first_name,
      last_name,
      email,
      password
    })
  }

  logout(){
    this.tokenService.removeToken();
    //para retirar al usuario:
    localStorage.removeItem('first_name')
    localStorage.removeItem('token')
    localStorage.removeItem('is_admin');
    console.log('Cerrando sesión...');
    this.isLoggedInSubject.next(false); // Notifica que el usuario ha cerrado sesión
    this.userNameSubject.next(''); // Resetear el nombre
    this.isAdminSubject.next(false);
    
  }

isAdmin(): boolean {
  return this.tokenService.isAdmin();
}

obtenerIdUsuario(): string {
  return '';
}

obtenerIdUsuario2(): number {
  return Number(localStorage.getItem('user_id'));
}

  getUserName(): string {
    return localStorage.getItem('first_name') || '';
  }

  isLogged(){
    this.isLoggedInSubject.next(true)
  }

  isNotLogged(){
    this.isLoggedInSubject.next(false)
  }

  obtenerClientes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/clientes/`);
}

}

