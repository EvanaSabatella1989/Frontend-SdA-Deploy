import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{

  miProd:any;
  categorias: any[] = [];
  constructor(private prod: ProductoService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.prod.traerProductos().subscribe({
      next:(productosTodos)=>{
        this.miProd=productosTodos;
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

  eliminar(produc: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${produc.nombre}"?`)) {
      this.prod.delete(produc.id).subscribe({
        next: () => {
          // Actualizamos la lista de productos después de eliminar
          this.prod.traerProductos().subscribe((productosActualizados) => {
            this.miProd = productosActualizados;
          });
          console.log(`El producto con ID ${produc.id} ha sido eliminado.`);
        },
        error: (errorData) => {
          console.error('Error al eliminar el producto:', errorData);
        }
      });
    } else {
      console.log('Eliminación cancelada por el usuario.');
    }
  }

  


}
