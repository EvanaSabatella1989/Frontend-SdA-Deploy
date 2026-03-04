import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Empleado } from "../models/empleado";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
//crear empleado
//==============
  crearEmpleado(data: any) {
  return this.http.post(`${this.apiUrl}/empleados/`, data);
}

 getEmpleados() {
    return this.http.get<any[]>(`${this.apiUrl}/empleados/`);
  }

  deleteEmpleado(id: number) {
    return this.http.delete(`${this.apiUrl}/empleados/${id}/`);
  }

editarEmpleado(id: number, empleado: Partial<Empleado>): Observable<Empleado> {
  return this.http.put<Empleado>(`${this.apiUrl + '/empleado/'}${id}/`, empleado);
}

//reservas pendientes del empleado
// getMisTrabajos() {
//   return this.http.get(`${this.apiUrl}/mis-trabajos/`);
// }

// 🔵 1️⃣ Reservas pendientes del empleado (hoy)
  getReservasHoyEmpleado() {
    return this.http.get<any[]>(
      `${this.apiUrl}/reservas/hoy-empleado/`
    );
  }

  // 🔵 2️⃣ Tomar reserva (crear orden)
  tomarReserva(id: number) {
    return this.http.post(
      `${this.apiUrl}/reservas/${id}/tomar/`,
      {}
    );
  }

    // 🟢 Mis órdenes de trabajo
  getMisTrabajos() {
    return this.http.get<any[]>(
      `${this.apiUrl}/ordenes_trabajo/mis-trabajos/`
    );
  }

// 🟢 4️⃣ Cambiar estado de orden
  cambiarEstadoOrden(id: number, estado: string) {
    return this.http.patch(
      `${this.apiUrl}/ordenes/${id}/cambiar-estado/`,
      { estado: estado }
    );
  }

    getReservasHoyEmpleado1() {
  return this.http.get<any[]>(`${this.apiUrl}/reservas/hoy-empleado/`);
}

tomarReserva1(id: number) {
  return this.http.post(`${this.apiUrl}/reservas/${id}/tomar/`, {});
}

}