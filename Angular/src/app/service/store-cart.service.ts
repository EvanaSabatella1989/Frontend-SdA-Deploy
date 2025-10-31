import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/product.model';
import { environment } from '../../environments/environment';

export interface CarritoItem {
  id: number;
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreCartService {

  
  // private apiUrl = "https://backend-sda-deploy.onrender.com/api/carrito"
  private apiUrl = environment.apiUrl
  //private carrito = new BehaviorSubject<Producto[]>([]);
  private carrito = new BehaviorSubject<CarritoItem[]>([]);
  myCart$ = this.carrito.asObservable();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Recuperar el token JWT
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Agregar el token al header
      'Content-Type': 'application/json'
    });
  }

  getCarrito(): void {
    this.http.get<{ items: CarritoItem[] }>(`${this.apiUrl}/carrito/`, { headers: this.getHeaders()}).subscribe(response => {
      this.carrito.next(response.items);
    });
  }

  addProduct(producto: Producto): void {
    this.http.post(`${this.apiUrl}/carrito/agregar/`, { producto_id: producto.id, cantidad: 1 }, { headers: this.getHeaders()})
      .subscribe(() => this.getCarrito());
  }

  removeProduct(itemId: number): void {
    this.http.delete(`${this.apiUrl}/carrito/eliminar/${itemId}/`, { headers: this.getHeaders()})
      .subscribe(() => this.getCarrito());
  }

  updateQuantity(productoId: number, cantidad: number): void {
    this.http.put(`${this.apiUrl}/carrito/modificar/`, 
      { producto_id: productoId, cantidad: cantidad }, 
      { headers: this.getHeaders() }
    ).subscribe(() => this.getCarrito());
  }

  isProductInCart(productId: number): boolean {
    const carritoActual = this.carrito.getValue(); // Obtener los datos actuales del carrito
    return carritoActual.some(item => item.producto.id === productId);
  }

  clearCart() {
  this.carrito.next([]); // ✅ Reinicia el carrito vacío
  localStorage.removeItem('carrito'); // ✅ Limpia el almacenamiento local (si lo usás)
}

emptyCart() {
  return this.http.delete(`${this.apiUrl}/carrito/vaciar_carrito/`, { headers: this.getHeaders() });
}


}
