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
  isLogged: boolean = false;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categorias: any[] = [];
  catSelec: any = { id: 0, nombre: 'Todos' };
  isAdmin: boolean = false;  

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private miCarrito: StoreCartService,
    private miProductos: ProductoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp);

    this.isAdmin = this.tokenService.isAdmin();

    // Traer todas las categorías
    this.miProductos.traerCategorias('producto').subscribe(resp => {
  this.categorias = resp;  // ya es any[]
  
});

    // Verificar si hay categoría seleccionada en la URL
    let id = this.activatedRouter.snapshot.params['id'];
    if (id > 0) {
      this.miProductos.detailCat(id).subscribe(
        data => {
          this.productos = data;
          this.productosFiltrados = data; // inicializamos filtrados
        },
        err => {
          alert("Error al cargar productos de la categoría");
          this.router.navigate(['/productos']);
        }
      );

      this.miProductos.categoria(id).subscribe(
        data2 => {
          this.catSelec = data2;
        }
      );
    } else {
      // Traer todos los productos si no hay categoría
      this.miProductos.traerProductos().subscribe(resp => {
        this.productos = resp;
        this.productosFiltrados = resp; // inicializamos filtrados
        console.log('Productos cargados:', this.productos);
      });
    }
  }

  // Filtra productos según la categoría seleccionada
//  filtrarPorCategoria(cat: any) {
//   this.catSelec = cat;
//   if (cat.id === 0) {
//     this.productosFiltrados = this.productos;
//   } else {
//     this.productosFiltrados = this.productos.filter(p => p.categoria === cat.id);
//   }
// }

  filtrarPorCategoria(cat: any) {
  this.catSelec = cat;
  if (cat.id === 0) {
    this.productosFiltrados = this.productos;
  } else {
    this.productosFiltrados = this.productos.filter(p => p.categoria === cat.id);
  }
}

  agregarCarrito() {
    if (!this.isLogged) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login']);
      return;
    }

    this.miCarrito.addProduct(this.productos[0]); // si usas detalle
    this.router.navigate(['/carrito']);
  }

  addProductToCart(product: any){
    if (!this.isLogged) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login']);
      return;
    }

    this.miCarrito.addProduct({...product, cantidad:1});
  }

  isInCart(productId: number): boolean {
    // return this.miCarrito.isProductInCart(productId);
    return false;
  }
}
