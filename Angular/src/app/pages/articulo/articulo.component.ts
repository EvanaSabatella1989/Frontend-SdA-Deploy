import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductoService } from 'src/app/service/producto.service';
import { StoreCartService } from 'src/app/service/store-cart.service';
import { TokenService } from 'src/app/service/token.service';

import {  Producto, Rating } from 'src/app/models/product.model';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  productos: any = {};
  catSelec: any = {};

  id: string="";
  nombre: string ="";
  precio: string="";
  imagen: string="";
  descripcion: string="";
  categoria: string="";
  // cantidad: string="1";
  cantidad: number= 1;

  


  constructor(private tokenService: TokenService, private authService: AuthService, private miCarrito: StoreCartService, private miProductos: ProductoService, private activatedRouter: ActivatedRoute, private router: Router) {
    const id = this.activatedRouter.snapshot.params['id'];
    let datos: any = {};
    this.miProductos.detail(id).subscribe(
      data => {
        this.productos = data;


      }, err => {
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )


  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp)

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin; // 🔹 Actualizar la variable local
    });

    // Obtener el carrito al cargar el componente
    this.miCarrito.getCarrito();
    // Suscribirse a los cambios en el carrito
    this.miCarrito.myCart$.subscribe(carrito => {
      this.productosEnCarrito = carrito.map(item => item.producto.id); // Guardar los IDs de los productos en el carrito
  });


    
    const id = this.activatedRouter.snapshot.params['id'];
    this.miProductos.detail(id).subscribe(
      data => {
        this.productos = data;
      }, err => {
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    );

  }

  // Nueva variable para guardar los productos en el carrito
  productosEnCarrito: number[] = [];

  guardarCantidad(event: any) {
    // this.cantidad=this.cantidad+1
    // console.log(this.cantidad = event.target.value)
    // return this.cantidad
    this.cantidad = parseInt(event.target.value, 10);
  }



  agregarCarrito() {

      // se verfica si el usuario está logueado
  if (!this.tokenService.getToken()) {
    // Si no esta logueado, redirigimos a la página de login
    this.router.navigate(['/login']);
    alert("Debes iniciar sesión para continuar con la compra");
    return; // Salimos de la función para evitar agregar el producto al carrito
  }


    this.productos.cantidad = this.cantidad;
    console.log(this.productos.id);
    console.log(this.productos.nombre);
    console.log(this.productos.descripcion);
    console.log(this.productos.precio);
    console.log(this.productos.date_created);
    console.log(this.productos.imagen);
    console.log(this.productos.cantidad)
    // let producto = this.productos;
    // producto.id = this.productos.id;

    this.miCarrito.addProduct(this.productos);
    this.router.navigate(['/carrito'])

  }

  isInCart(productId: number): boolean {
    return this.productosEnCarrito.includes(productId);
  }
  
}
