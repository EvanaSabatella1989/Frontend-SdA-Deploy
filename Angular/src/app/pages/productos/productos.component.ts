import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductoService } from 'src/app/service/producto.service';
import { StoreCartService } from 'src/app/service/store-cart.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  isLogged:boolean= false;
  productos: any = {};
  categorias: any = {};
  productosCat: any = {};
  catSelec: any = {};
  isAdmin: boolean = false;  // verifica si el usuario es admin


  constructor(private tokenService: TokenService, private authService: AuthService, private miCarrito: StoreCartService, private miProductos: ProductoService, private activatedRouter: ActivatedRoute, private router: Router) {

  }
  //cambio
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp)

    // Verifica si el usuario es admin usando el TokenService
    this.isAdmin = this.tokenService.isAdmin();
    
    let id = this.activatedRouter.snapshot.params['id'];
    if (id > 0) {
      this.miProductos.detailCat(id).subscribe(
        data => {
          this.productos = data;

        }, err => {
          alert("Error al cargar");
          this.router.navigate(['/productos']);
        }
      )
    }
    else {
      this.miProductos.traerProductos().subscribe(resp => {
        this.productos = resp;
      })

    }
    this.miProductos.categoria(id).subscribe(
      data2 => {
        this.catSelec = data2;

      })
    this.miProductos.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;

    })




  }

  agregarCarrito() {

    if (!this.isLogged) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login']); // Redirige a la página de login
      return;
    }

    console.log(this.productos.id);
    console.log(this.productos.nombre);
    console.log(this.productos.descripcion);
    console.log(this.productos.precio);
    console.log(this.productos.date_created);
    console.log(this.productos.imagen);


    let producto = this.productos;
    producto.id = this.productos.id;

    this.miCarrito.addProduct(producto);
    this.router.navigate(['/carrito'])

  }

  addProductToCart(product: any){

    if (!this.isLogged) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login']); // Redirige a la página de login
      console.log("desde productos");
      return;
    }
  
    this.miCarrito.addProduct({...product, cantidad:1})
  }

  isInCart(productId: number): boolean {
    // return this.miCarrito.isProductInCart(productId);
    return false;
  }
  
  
  
}
