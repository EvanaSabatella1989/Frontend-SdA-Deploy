import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Categoria } from 'src/app/models/categoria';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{

  // miProd:any;
  // categorias: any[] = [];
  categoriaSeleccionada: number | 'todas' = 'todas';
  // productosFiltrados: any[] = [];
  miProd: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  busquedaNombre: string = '';



  constructor(private prod: ProductoService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.prod.traerProductos().subscribe({
      next:(productosTodos: Producto[])=>{
        this.miProd=productosTodos;
        this.productosFiltrados = productosTodos; // 👈 importante
        console.log(" Exito se cargaron los productos");
      },
      error:(errorData)=> {
        console.log("error del componenete producto ");
        console.error(errorData);
        this.router.navigate(['']);
      }
    });

    this.prod.traerCategorias('producto').subscribe(resp => {
    this.categorias = resp;
 
  });



  }
  // eliminar(produc:any){
  //   this.miProd.forEach((producto:any)=>{
  //     if(producto.id== produc.id){
  //       this.prod.delete(produc.id).subscribe(
  //         res=>this.prod.traerProductos().subscribe(
  //           Response=>this.miProd=Response
  //         )
  //       );
  //       console.log('elimino el producto: '+this.miProd.id);
  //     }
  //   })

  // }

  getNombreCategoria(idCategoria?: number): string {
    if (!idCategoria) {
      return 'Sin categoría';
    }

    const cat = this.categorias.find(c => c.id === idCategoria);
    return cat ? cat.nombre : 'Sin categoría';
  }



  // eliminar(produc: any) {
  //   if (confirm(`¿Estás seguro de que deseas eliminar el producto "${produc.nombre}"?`)) {
  //     this.prod.delete(produc.id).subscribe({
  //       next: () => {
  //         // Actualizamos la lista de productos después de eliminar
  //         this.prod.traerProductos().subscribe((productosActualizados) => {
  //           this.miProd = productosActualizados;
  //         });
  //         console.log(`El producto con ID ${produc.id} ha sido eliminado.`);
  //       },
  //       error: (errorData) => {
  //         console.error('Error al eliminar el producto:', errorData);
  //       }
  //     });
  //   } else {
  //     console.log('Eliminación cancelada por el usuario.');
  //   }
  // }

  eliminar(produc: Producto) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el producto "${produc.nombre}"?`)) {
      return;
    }

    this.prod.delete(produc.id!).subscribe({
      next: () => {

        // 1️⃣ Actualizamos la lista base
        this.miProd = this.miProd.filter(p => p.id !== produc.id);

        // 2️⃣ Reaplicamos el filtro actual
        this.filtrarPorCategoria();

        console.log(`Producto ${produc.id} eliminado correctamente`);
      },
       error: (error) => {
      if (error.status === 400) {
        alert(error.error.detail);
      } else {
        alert('Error al eliminar el producto');
      }
    }
    });
  }


  filtrarPorCategoria() {
    if (this.categoriaSeleccionada === 'todas') {
      this.productosFiltrados = this.miProd;
    } else {
      this.productosFiltrados = this.miProd.filter(
        (p: Producto) => p.categoria === this.categoriaSeleccionada
      );
    }
  }

  buscarPorNombre() {
  this.categoriaSeleccionada = 'todas';

  const texto = this.busquedaNombre.toLowerCase().trim();

  this.productosFiltrados = this.miProd.filter(
    (p: Producto) =>
      p.nombre?.toLowerCase().includes(texto)
  );
}





  


}
