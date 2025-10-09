import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/product.model';
import { CarritoItem } from './store-cart.service';


@Injectable({
  providedIn: 'root'
})
export class PayService {
  apiUrl = 'https://backend-sda-deploy.onrender.com/api/'
  constructor(
    private http: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Recuperar el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token al header
        'Content-Type': 'application/json'
      });
    }

  // preference(items: Producto[]){
  //   console.log(items,"service")
  //   return this.http.post<{init_point: string}>(`${this.apiUrl}/venta/preference`, {
  //     items: items}, { headers: this.getHeaders()})
  // }

  preference(items: CarritoItem[]) {
    console.log("Productos a enviar:", items); // Verifica qué se está enviando
  
    const formattedItems = items.map(item => ({
      title: item.producto.nombre,
      unit_price: Number(item.producto.precio) || 0,
      quantity: item.cantidad
    }));

    console.log(formattedItems);
  
    return this.http.post<{init_point: string}>(`${this.apiUrl}/venta/preference`, {
      items: formattedItems
    }, { headers: this.getHeaders() });
  }

  
}
