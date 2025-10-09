// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs'
// import { Producto } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class StoreCartService {
//   private myShoppingCart: Producto[]= [];
//   private myCart = new BehaviorSubject<Producto[]>([]);

//   myCart$ = this.myCart.asObservable();
//   totalCart = 0;

//   constructor(){
//     const storageCart = sessionStorage.getItem('cart')
//     if(storageCart){
//       this.myShoppingCart = JSON.parse(storageCart)
//       this.myCart.next(this.myShoppingCart)
//     }
//   }
//   addProduct(product: Producto) {
//     this.myShoppingCart.push(product)
//     this.saveProduct()
//   }
  
//   getShoppingCart() {
//     return this.myShoppingCart
//   }
//   getTotal() {
//     return 1
//   }

//   deleteProduct(id:number) {
//     this.myShoppingCart = this.myShoppingCart.filter(p => p.id !== id)
//     this.saveProduct()
//   }

//   updateQuality(id: number, cantidad: number) {
//     this.myShoppingCart = this.myShoppingCart.map(p => {
//       if(p.id === id){
//         return {
//           ...p,
//           cantidad: cantidad
//         }
//       }
//       return p
//     })
//     console.log(this.myShoppingCart)
//     this.saveProduct()
//   }
//   private saveProduct() {
//     sessionStorage.setItem('cart', JSON.stringify(this.myShoppingCart))
//     this.myCart.next(this.myShoppingCart);
//   }

//   isProductInCart(productId: number): boolean {
//     return this.myShoppingCart.some(product => product.id === productId);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/product.model';

export interface CarritoItem {
  id: number;
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreCartService {

  
  private apiUrl = "https://backend-sda-deploy.onrender.com/api/carrito"
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
    this.http.get<{ items: CarritoItem[] }>(`${this.apiUrl}/`, { headers: this.getHeaders()}).subscribe(response => {
      this.carrito.next(response.items);
    });
  }

  addProduct(producto: Producto): void {
    this.http.post(`${this.apiUrl}/agregar/`, { producto_id: producto.id, cantidad: 1 }, { headers: this.getHeaders()})
      .subscribe(() => this.getCarrito());
  }

  removeProduct(itemId: number): void {
    this.http.delete(`${this.apiUrl}/eliminar/${itemId}/`, { headers: this.getHeaders()})
      .subscribe(() => this.getCarrito());
  }

  updateQuantity(productoId: number, cantidad: number): void {
    this.http.put(`${this.apiUrl}/modificar/`, 
      { producto_id: productoId, cantidad: cantidad }, 
      { headers: this.getHeaders() }
    ).subscribe(() => this.getCarrito());
  }

  isProductInCart(productId: number): boolean {
    const carritoActual = this.carrito.getValue(); // Obtener los datos actuales del carrito
    return carritoActual.some(item => item.producto.id === productId);
  }
}
