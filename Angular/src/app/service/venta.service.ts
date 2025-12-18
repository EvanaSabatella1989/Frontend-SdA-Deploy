import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Venta } from "../models/venta";


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = `${environment.apiUrl}/ventas/`;

  constructor(private http: HttpClient) {}

  // lista de ventas
  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  // por id
  getVentaById(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}${id}/`);
  }

  // crear
  crearVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  // actualizar
  actualizarVenta(id: number, venta: Partial<Venta>): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}${id}/`, venta);
  }

  //eliminar
  eliminarVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
