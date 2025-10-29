import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from 'src/app/models/producto'
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent {
  productos: any = {};
  categorias: any = {};


  nombre: string = "";
  imagen!: File;
  descripcion: string = "";
  precio: string = "";
  cantidad: string = "";
  categoria: string = "";
  fecha_creacion: string = "";

  constructor(private productoServicio: ProductoService, private router: Router) {

  }

  ngOnInit(): void {

    this.productoServicio.traerCategorias('producto').subscribe(resp2 => {
      this.categorias = resp2;

    })
  }



  guardarNombre(event: any) {
    console.log(this.nombre = event.target.value)
  }

  guardarDescripcion(event: any) {
    console.log(this.descripcion = event.target.value)
  }

  guardarPrecio(event: any) {
    console.log(this.precio = event.target.value)
  }

  guardarCantidad(event: any) {
    console.log(this.cantidad = event.target.value)
  }

  guardarCategoria(event: any) {
    console.log(this.categoria = event.target.value)
  }
  
  selectCategoria(event: any) {
  this.categoria = event.target.value; // 👈 lo convertís a número aquí
  console.log('Categoría seleccionada:', this.categoria);
}

  enviarFoto(event: any) {
    console.log(this.imagen = event.target.files[0])
  }





  create() {
    const produ = new FormData();
    produ.append('nombre', this.nombre);
    produ.append('descripcion', this.descripcion);
    produ.append('precio', this.precio);
    produ.append('cantidad', this.cantidad);
    produ.append('categoria', this.categoria);
    produ.append('fecha_creacion', this.fecha_creacion);
    produ.append('imagen', this.imagen, this.imagen!.name);
    this.productoServicio.create(produ).subscribe(
      servicio => this.router.navigate(['/productos'])

      ,
      error => console.log(error)

    );



  }


}
