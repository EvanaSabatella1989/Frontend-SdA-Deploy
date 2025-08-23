// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = "http://localhost:8000/api/perfil/";
  private apiUrl2="http://localhost:8000/api";

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Recuperar el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token al header
        'Content-Type': 'application/json'
      });
    }

  // obtenerPerfil(userId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${userId}/perfil`);
  // }

  obtenerPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl,{ headers: this.getHeaders()});
  }

  // para obtener los id de clientes relacionados a usuario
  obtenerClienteId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/perfil-cliente/`, { headers: this.getHeaders() });
  }
  
}
