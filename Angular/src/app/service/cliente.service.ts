import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    // private apiUrl = 'https://backend-sda-deploy.onrender.com/api/clientes/';
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl+'/clientes/');
    }

    getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl+'/clientes/'}${id}/`);
    }

    updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl+'/clientes/'}${id}/`, cliente);
    }

    deleteCliente(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl+'/clientes/'}${id}/`);
    }
}