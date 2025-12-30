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

  nombreError: string = '';
  imagenError: string = '';
  categoriaError: string = '';
  precioError: string = '';
  cantidadError: string = '';

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
    this.nombreError = '';
  }

  guardarDescripcion(event: any) {
    console.log(this.descripcion = event.target.value)
  }

  guardarPrecio(event: any) {
    this.precio = event.target.value;
    this.precioError = '';
  }

  guardarCantidad(event: any) {
    const valor = event.target.value;

    // Limpiar error previo
    this.cantidadError = '';

    // Vacío
    if (!valor) {
      this.cantidadError = 'La cantidad es obligatoria';
      this.cantidad = '';
      return;
    }

    const numero = Number(valor);

    // No número / decimal
    if (!Number.isInteger(numero)) {
      this.cantidadError = 'La cantidad debe ser un número entero';
      this.cantidad = '';
      return;
    }

    // Menor o igual a 0
    if (numero <= 0) {
      this.cantidadError = 'La cantidad debe ser mayor a 0';
      this.cantidad = '';
      return;
    }

    // ✔ Todo OK
    this.cantidad = numero.toString();
  }


  guardarCategoria(event: any) {
    console.log(this.categoria = event.target.value)
    this.categoriaError = '';
  }
  
  selectCategoria(event: any) {
  this.categoria = event.target.value; // 👈 lo convertís a número aquí
  console.log('Categoría seleccionada:', this.categoria);
}

  enviarFoto(event: any) {
    console.log(this.imagen = event.target.files[0])
    this.imagenError = ''; // limpia el error al seleccionar imagen
  }





  create() {

    let hayError = false;
    const cantidadNum = Number(this.cantidad)

    // 🔴 Nombre
    if (!this.nombre || this.nombre.trim() === '') {
      this.nombreError = 'El nombre del producto es obligatorio';
      hayError = true;
    } else {
      this.nombreError = '';
    }

    // 🔴 Imagen
    if (!this.imagen) {
      this.imagenError = 'La imagen es obligatoria';
      hayError = true;
    } else {
      this.imagenError = '';
    }

    // 🔴 Categoría
    if (!this.categoria) {
      this.categoriaError = 'Debe seleccionar una categoría';
      hayError = true;
    } else {
      this.categoriaError = '';
    }

    if (!this.precio || Number(this.precio) <= 0) {
      this.precioError = 'El precio debe ser mayor a 0';
      hayError = true;
    }

    if (
      !this.cantidad ||
      !Number.isInteger(cantidadNum) ||
      cantidadNum <= 0
    ) {
      this.cantidadError = 'La cantidad debe ser un número entero mayor a 0';
      hayError = true;
    } else {
      this.cantidadError = '';
    }

    // 🚫 Si hay errores, no se envía
    if (hayError) {
      return;
    }

    const produ = new FormData();
    produ.append('nombre', this.nombre);
    produ.append('descripcion', this.descripcion);
    produ.append('precio', this.precio);
    produ.append('cantidad', this.cantidad);
    produ.append('categoria', this.categoria);
    produ.append('fecha_creacion', this.fecha_creacion);
    produ.append('imagen', this.imagen, this.imagen!.name);
    // this.productoServicio.create(produ).subscribe(
    //   servicio => this.router.navigate(['/productos'])

    //   ,
    //   error => console.log(error)

    // );

    this.productoServicio.create(produ).subscribe(
    () => this.router.navigate(['/productos']),
    error => console.log(error)
    );



  }


}
