import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';
import { formatDate } from '@angular/common';
import { Sucursal } from '../models/sucursal';
import { Turno } from '../models/turno';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  // url2:string="http://localhost:8000/photos/photos/";
  // url: string = "http://localhost:8000/api/servicios/"
  // urlDos: string = "http://localhost:8000/api/reservas/"
  // urlTres: string = "http://127.0.0.1:8000/api"
  // url4: string = "http://127.0.0.1:8000/api/sucursal/"
  // urlTurno: string = "http://127.0.0.1:8000/api/turnos/"

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  obtenerCategorias(tipo: string) {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/?tipo=${tipo}`);
  }

  // ----------SERVICIOS-------

  // obtener todos los servicios
  obtenerServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/`);
  }

  // obtener un servicio por ID
  obtenerServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/servicios/${id}/`);
  }

  // crear un nuevo servicio (con imagen)
 crearServicio(formData: FormData): Observable<Servicio> {
  return this.http.post<Servicio>(`${this.apiUrl}/servicios/`, formData);
}


  // ctualizar un servicio
  actualizarServicio(id: number, formData: FormData): Observable<Servicio> {
  return this.http.put<Servicio>(`${this.apiUrl}/servicios/${id}/`, formData);
}

  // Eliminar un servicio
  eliminarServicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/servicios/${id}/`);
  }

  obtenerServiciosConSucursales(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/servicios/con-sucursales/`);
}

  // ---------RESERVA---------------
  crearReserva(reserva: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token guardado');
    }
    return this.http.post(`${this.apiUrl}/reservas/`, reserva, {
      headers: { Authorization: `Bearer ${token}` }
    });

  }

   obtenerReservas(): Observable<any[]> {
    const token = localStorage.getItem('token'); // o como tengas tu JWT
    return this.http.get<any[]>(`${this.apiUrl}/reservas/`,{
        headers: { Authorization: `Bearer ${token}` }
    });
    

  }
  // actualizar reserva
  actualizarReserva(id: number, reserva: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/reservas/${id}/`, reserva, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // eliminar reserva
  eliminarReserva(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/reservas/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // dias disponibles  de sucursales
  obtenerDiasDisponibles(sucursalId: number) {
    return this.http.get<{ dias_disponibles: string[] }>(
      `${this.apiUrl}sucursal/${sucursalId}/dias-disponibles/`
    );
  }

  //turnos disponibles de por sucursal
  obtenerTurnosPorSucursal(sucursalId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/turnos/disponibles-por-sucursal/?sucursal=${sucursalId}`);
  }

  // --------FIN RESERVA------

// ---------SUCURSAL------------
  // crud sucursal
  createSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.apiUrl}/sucursal/`, sucursal);
  }

  updateSucursal(id: number, sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.apiUrl}/sucursal/${id}/`, sucursal);
  }

  deleteSucursal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sucursal/${id}/`);
  }

  getSucursales():Observable<Sucursal[]>{
      return this.http.get<Sucursal[]>(`${this.apiUrl}/sucursal/`);
  }

  getSucursal(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.apiUrl}/sucursal/${id}/`);
  }

  // para seleccionar sucursal en la reserva
  obtenerSucursalesPorServicio(servicioId: number) {
  return this.http.get<Sucursal[]>(`${this.apiUrl}/sucursal/por-servicio/?servicio_id=${servicioId}`);
  
}

// para realizar el filtro en servicios, x servicios por x sucursal
obtenerServiciosPorSucursal(sucursalId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/sucursal/${sucursalId}/servicios/`);
}



  // ---------TURNOS-------------

    obtenerSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.apiUrl}/sucursal/`);

  }
  // turnos disponibles por sucursal y fecha
  obtenerTurnosDisponibles(sucursalId: number, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/turnos/disponibles/?sucursal=${sucursalId}&fecha=${fecha}`);
  }

  //crud para turnos
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/turnos/`);
  }

  createTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(`${this.apiUrl}/turnos/`, turno);
  }

  updateTurno(id: number, turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/turnos/${id}/`, turno);
  }

  deleteTurno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/turnos/${id}/`);
  }
}


