import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
declare var bootstrap: any;
import { Categoria } from 'src/app/models/categoria';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{

  // miProd:any;
  // categorias: any[] = [];
  // categoriaSeleccionada: number | 'todas' = 'todas';
  // productosFiltrados: any[] = [];
  miProd: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  busquedaNombre: string = '';

  categoriaSeleccionada: number | null = null;
  productoActual: Producto | null = null;
  productoForm!: FormGroup;
  imagenSeleccionada?: File | null = null;
  modalInstance: any;
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  catSelec: any = { id: 0, nombre: 'todas' };
  



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

  listarProductos() {
    this.prod.traerProductos().subscribe({
      next: (todaLaLista) => {
        this.miProd = todaLaLista.map((s: any) => {
          const categoriaEncontrada = this.categorias.find(c => c.id === s.categoria);
          return {
            ...s,
            categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría',
          };
        });
        console.log("Productos cargados con categoría:", this.miProd);
      },
      error: (errorData) => {
        console.log("no cargo lista");
        console.log(errorData);
        this.router.navigate(['']);
      }
    });
  }

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
    if (this.catSelec === 'todas') {
      this.productosFiltrados = this.miProd;
    } else {
      this.productosFiltrados = this.miProd.filter(
        (p: Producto) => p.categoria === this.categoriaSeleccionada
      );
    }
  }

  buscarPorNombre() {
  this.catSelec = 'todas';

  const texto = this.busquedaNombre.toLowerCase().trim();

  this.productosFiltrados = this.miProd.filter(
    (p: Producto) =>
      p.nombre?.toLowerCase().includes(texto)
  );


}



  abrirModal(producto?: Producto) {


    if (producto) {
      this.productoActual = producto || null;
      // modo editar
      this.nombre = producto.nombre ?? '';
      this.descripcion = producto.descripcion ?? '';
      this.precio = producto.precio?? null;
      this.categoriaSeleccionada = producto.categoria ?? null;
      this.imagenSeleccionada = null; // para que no quede la imagen anterior cargada
    } else {
      // modo crera/modal limpio
      this.productoActual = null;
      this.nombre = '';
      this.descripcion = '';
      this.precio = null;
      this.imagenSeleccionada = null;
    }

    const modalEl = document.getElementById('modalProducto');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }




  seleccionarImagen(event: any): void {
    if (event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    }
  }

  guardarProducto() {

    if (this.nombreMuyLargo()) {
      alert("⚠️ El nombre es demasiado largo. Máximo 50 caracteres.");
      return;
    }

    if (!this.nombre?.trim() || !this.descripcion?.trim() || this.precio == null) {
      alert('⚠️ Debes completar todos los campos antes de guardar!');
      return;
    }

    //validar duplicados
    const nombreNormalizado = this.nombre.trim().toLowerCase();

    const existe = this.miProd.some((p: Producto) =>
      p.nombre?.trim().toLowerCase() === nombreNormalizado &&
      p.id !== this.productoActual?.id
    );

    if (existe) {
      alert(`⚠️ Ya existe un servicio con el nombre "${this.nombre}". Elige otro.`);
      return;
    }


    // validar imagen solo al crear
    if (!this.productoActual && !this.imagenSeleccionada) {
      alert("⚠️ Debes seleccionar una imagen para crear un servicio.");
      return;
    }



    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio.toString());
    


    if (this.categoriaSeleccionada) {
      formData.append('categoria', this.categoriaSeleccionada.toString());
    } else {
      alert("⚠️ Debes seleccionar una categoría");
      return;
    }


    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    if (this.productoActual?.id) {
      if (!window.confirm('Deseas actualizar este producto?')) return;

      this.prod.update(this.productoActual.id, formData).subscribe({
        next: () => {
          alert('✅ Producto actualizado con éxito');


          this.prod.traerProductos().subscribe((productos) => {
          this.miProd = productos;
          this.productosFiltrados = productos;
          });


          this.modalInstance.hide();
          this.limpiarFormulario();
          },
        error: (error) => {
          console.error(error);
          alert('❌ Error al actualizar producto.');
        }
      });
    } else {
      this.prod.create(formData).subscribe({
        next: () => {
          alert('✅ Producto creado con éxito');
          this.prod.traerProductos().subscribe((productos) => {
          this.miProd = productos;
          this.productosFiltrados = productos;
          });


          this.modalInstance.hide();
          this.limpiarFormulario();
          },
        error: (error) => {
          console.error(error);
          alert('❌ Error al crear producto.');
        }
      });
    }
  }

  // validaciones
  campoInvalido(valor: any): boolean {
    return !valor || valor.toString().trim().length === 0;
  }

  precioInvalido(): boolean {
    return !this.precio || this.precio <= 0;
  }

  formInvalido(): boolean {
    return (
      this.campoInvalido(this.nombre) ||
      this.campoInvalido(this.descripcion) ||
      this.precioInvalido() ||
      !this.categoriaSeleccionada
    );
  }

  limpiarFormulario() {
    this.productoActual = null;
    this.nombre = '';
    this.descripcion = '';
    this.precio = null;
    this.categoriaSeleccionada = null;
    this.imagenSeleccionada = null;
  }

  nombreMuyLargo(): boolean {
    return this.nombre?.trim().length > 50;
  }



}
