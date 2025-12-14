import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VentaService {
    apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    // Obtener todas las ventas
    getVentas(): Observable<any> {
        return this.http.get(`${this.apiUrl}/`);
    }

    // Obtener una venta por ID
    getVentaById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    // Crear una venta
    crearVenta(venta: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/`, venta);
    }

    // Actualizar una venta
    actualizarVenta(id: number, venta: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/`, venta);
    }

    // Eliminar una venta
    eliminarVenta(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}