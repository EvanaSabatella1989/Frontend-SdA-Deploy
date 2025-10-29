import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})

export class EditarProductosComponent {

  productos: any = {};
  categorias: any = {};

  id: string = "";
  nombre: string = "";
  imagen!: File;
  descripcion: string = "";
  precio: string = "";
  cantidad: string = "";
  categoria: string = "";
  fecha_creacion: string = "";

  constructor(private productoServicio: ProductoService, private activatedRouter: ActivatedRoute, private router: Router) {

    const id = this.activatedRouter.snapshot.params['id'];
    let datos:any= {};
    this.productoServicio.detail(id).subscribe(
      data => {
        this.productos = data;
        
        
      }, err => {
        alert("Error al cargar");
        this.router.navigate(['']);
      }
    )

  }

  ngOnInit(): void {


    this.productoServicio.traerCategorias('producto').subscribe(resp2 => {
      this.categorias = resp2;

    })
  }

  guardarId(event: any) {
    console.log(this.id = event.target.value)
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
    console.log(this.categoria = event.target.value)
  }

  enviarFoto(event: any) {
    console.log(this.imagen = event.target.files[0])
  }

  // enviarFoto(event: any) {
  //   this.imagen = event.target.files[0];
  // }


  // actualizar() {
  //   const produ = new FormData();
  //   //produ.append('nombre', this.productos.id);
  //   produ.append('nombre', this.productos.nombre);
  //   produ.append('descripcion', this.productos.descripcion);
  //   produ.append('precio', this.productos.precio);
  //   produ.append('cantidad', this.productos.cantidad);
  //   produ.append('categoria', this.productos.categoria);
  //   //produ.append('fecha_creacion', this.fecha_creacion);
  //   produ.append('imagen', this.imagen, this.imagen!.name);
    
  //   console.log(this.productos.id)
  //   this.productoServicio.update(this.productos.id,produ).subscribe(
  //     data => this.router.navigate(['/productos'])

  //     ,
  //     error => console.log(error)

  //   );
  //   }

  actualizar() {
  const formData = new FormData();

  // Enviás siempre el ID
  formData.append('id', this.productos.id);

  // Nombre
  if (this.productos.nombre) {
    formData.append('nombre', this.productos.nombre);
  }

  // Imagen (si el usuario subió una nueva)
  if (this.imagen) {  // imagen lo guardás en enviarFoto($event)
    formData.append('imagen', this.imagen, this.imagen.name);
  }

  // Descripción
  if (this.productos.descripcion) {
    formData.append('descripcion', this.productos.descripcion);
  }

  // Precio
  if (this.productos.precio !== null && this.productos.precio !== undefined) {
    formData.append('precio', this.productos.precio);
  }

  // Cantidad
  if (this.productos.cantidad !== null && this.productos.cantidad !== undefined) {
    formData.append('cantidad', this.productos.cantidad);
  }

  // Categoría
  if (this.productos.categoria) {
    formData.append('categoria', this.productos.categoria);
  }

  this.productoServicio.update(this.productos.id,formData).subscribe(
      data => {
    alert("✅ Producto actualizado correctamente");
    this.router.navigate(['/productos']);
  },
      error => console.log(error)

    );
}
}
