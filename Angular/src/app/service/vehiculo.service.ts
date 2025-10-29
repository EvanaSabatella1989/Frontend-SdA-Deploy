import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  // private apiUrl = 'https://backend-sda-deploy.onrender.com/api';  // URL del backend
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  agregarVehiculo(vehiculoData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehiculo/agregar/`, vehiculoData, { headers: this.getHeaders() });
  }

  getVehiculo(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/vehiculo/${id}/`, { headers: this.getHeaders() });
}

  editarVehiculo(id: number, vehiculoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vehiculo/${id}/`, vehiculoData, { headers: this.getHeaders() });
  }

  eliminarVehiculo(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/vehiculo/eliminar/${id}/`, { headers: this.getHeaders() });
}
}
