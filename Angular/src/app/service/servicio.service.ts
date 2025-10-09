import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Servicio } from '../models/servicio';
import { formatDate } from '@angular/common';
import { Sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
// url2:string="http://localhost:8000/photos/photos/";
url:string="https://backend-sda-deploy.onrender.com/api/servicios/"
urlDos:string="https://backend-sda-deploy.onrender.com/api/reserva/"
urlTres:string="https://backend-sda-deploy.onrender.com/api/"
url4:string="https://backend-sda-deploy.onrender.com/api/sucursal/"

 constructor(private http:HttpClient) { }

 ngOnInit(){}

 // obtener todos los servicios
 obtenerServicios(): Observable<any> {
  return this.http.get(this.url);
}

// obtener un servicio por ID
obtenerServicio(id: number): Observable<Servicio> {
  return this.http.get<Servicio>(`${this.url}${id}/`);
}

// crear un nuevo servicio (con imagen)
crearServicio(servicio: Servicio, imagen?: File): Observable<Servicio> {
  const formData = new FormData();
  formData.append('nombre', servicio.nombre ?? '');
  formData.append('descripcion', servicio.descripcion ?? '');
  formData.append('precio', servicio.precio ? servicio.precio.toString() : ''); // Asegura que sea string

  // solo agrega la imagen si existe
  if (imagen) {
    formData.append('imagen', imagen, imagen.name);
  }

  return this.http.post<Servicio>(this.url, formData);
}


// ctualizar un servicio
actualizarServicio(id: number, servicio: FormData, imagen?: File): Observable<Servicio> {
  const formData = new FormData();
  if (imagen) {
    formData.append('imagen', imagen);
  }

  return this.http.put<Servicio>(`${this.url}${id}/`, servicio);
}

// Eliminar un servicio
eliminarServicio(id: number): Observable<any> {
  return this.http.delete(`${this.url}${id}/`);
}



// / Obtener todas las sucursales disponibles
// obtenerSucursales(): Observable<any> {
//   return this.http.get<any>('http://127.0.0.1:8000/api/sucursal/');
// }

obtenerSucursales(): Observable<Sucursal[]> {
  return this.http.get<Sucursal[]>(this.url4);
}
// Obtener los turnos disponibles de una sucursal
obtenerTurnos(sucursalId: number): Observable<any> {
  return this.http.get(`${this.urlTres}/disponibles/${sucursalId}/`);
}

// Reservar un turno
reservarTurno(datosReserva: any): Observable<any> {
  return this.http.post(`${this.urlTres}/reservar-turno/`, datosReserva);
}

// obtenerTurnosDisponibles(sucursalId: number): Observable<any[]> {
//   console.log(`Obteniendo turnos desde: ${this.urlTres}/disponibles/?sucursal_id=${sucursalId}`); 
//   return this.http.get<any[]>(`${this.urlTres}/disponibles/?sucursal_id=${sucursalId}`);
// }
// obtenerTurnosDisponibles(sucursalId: number): Observable<any[]>{
//   const url = `${this.urlTres}/disponibles/${sucursalId}/`; 
//   console.log("URL de solicitud:para ver", url); // Verifica la URL
//   return this.http.get<any[]>(url);
// }

// reservarTurno(cliente_id: number, turno_id: number, cliente_email: string): Observable<any> {
//   const data = {
//     cliente_id: cliente_id,
//     turno_id: turno_id,
//     cliente_email: cliente_email
//   };
  
//   return this.http.post(`${this.urlTres}/reservar-turno/`, data);
// }


// funciona pero no envia
// reservarTurno(data: any): Observable<any> {
//   return this.http.post(`${this.urlTres}/reservar-turno/`, data);
// }
// Enviar reserva de turno
// reservarTurno(data: any): Observable<any> {
//   return this.http.post<any>(`${this.urlTres}/reservar-turno/`, data);
// }
// Obtener los horarios disponibles para una sucursal específica
// obtenerHorariosDisponibles(sucursalId: number): Observable<any> {
//   const url = `${this.urlTres}?sucursal=${sucursalId}`;
//   console.log('Haciendo solicitud a:', url);  // Verificamos la URL que se está llamando
//   return this.http.get<any>(url);
// }

// obtenerHorariosDisponibles(sucursalId: number): Observable<any> {
//   return this.http.get(`${this.urlTres}horarios-disponibles/${sucursalId}/`);
// }

}

