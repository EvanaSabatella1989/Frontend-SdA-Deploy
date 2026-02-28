import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Empleado } from '../models/empleado';

// @Injectable({
//   providedIn: 'root',
// })
// export class UsuarioService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   /** 
//    * Genera los headers con token JWT si existe.
//    */
//   private getAuthHeaders(): HttpHeaders {
//     const token = sessionStorage.getItem('access_token');
//     if (!token) {
//       console.warn('⚠️ No se encontró access_token en sessionStorage');
//       return new HttpHeaders(); // sin auth
//     }
//     return new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     });
//   }

//   /** 
//    * Obtiene el perfil del usuario autenticado
//    */
//   obtenerPerfil(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/perfil/`, {
//       headers: this.getAuthHeaders(),
//     });
//   }

//   /**
//    * Obtiene el ID del cliente asociado al usuario autenticado
//    */
//   obtenerClienteId(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/perfil-cliente/`, {
//       headers: this.getAuthHeaders(),
//     });
//   }

//   /**
//    * Obtiene el perfil con datos específicos para reservas
//    */
//   obtenerPerfilReserva(): Observable<any> {
//     const token = sessionStorage.getItem('access_token');
//     if (!token) {
//       console.error('❌ No hay token guardado. Redirigir al login.');
//       return throwError(() => new Error('Token no disponible'));
//     }

//     return this.http.get<any>(`${this.apiUrl}/perfil-reserva/`, {
//       headers: this.getAuthHeaders(),
//     });
//   }
// }


@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil/`);
  }

  obtenerClienteId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil-cliente/`);
  }

  obtenerPerfilReserva(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil-reserva/`);
  }

 
}


