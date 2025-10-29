import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from 'src/app/models/contacto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // private apiUrl = 'https://backend-sda-deploy.onrender.com/api/contacto/';  // Ajusta la URL si es necesario
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  enviarContacto(contacto: Contacto): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/contacto/', contacto);
  }
}
