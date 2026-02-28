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

getMisTrabajos() {
  return this.http.get(`${this.apiUrl}/mis-trabajos/`);
}
}