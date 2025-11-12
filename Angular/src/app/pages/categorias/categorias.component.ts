import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
declare var bootstrap: any; // 👈 Importante para usar modales de Bootstrap

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  // miCat: any;
  // miCat: any[] = [];
  miCat: Categoria[] = [];
  tipoCategoria: string = 'producto'; // por defecto

  // variables del modal
  nombre: string = '';
  tipo: string = '';
  editando: boolean = false;
  idEditando: number | null = null;
  nombreDuplicado: boolean = false;
  modal: any;

  constructor(
    private cat: CategoriaService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.modal = new bootstrap.Modal(document.getElementById('modalCategoria'));
  }

//   cargarCategorias() {
//     this.cat.obtenerCategorias(this.tipoCategoria).subscribe({
//       next: (categorias) => this.miCat = categorias,
//       error: (err) => console.error(err)
//     });
//   }

//   delete(item: any) {
//     this.miCat.forEach((categoria: any) => {
//       if (categoria.id == item.id) {
//         this.cat.delete(item.id).subscribe(
//           res => this.cat.obtenerCategorias(this.tipoCategoria).subscribe(
//             Response => this.miCat = Response
//           )
//         );
//         console.log('Borré la categoría número: ' + item.id);
//       }
//     });
//   }

//   abrirModal() {
//     // setear automáticamente el tipo según el contexto actual
//     this.tipo = this.tipoCategoria;
//     this.nombre = '';

//     const modalElement = document.getElementById('modalAgregarCategoria');
//     this.modal = new bootstrap.Modal(modalElement);
//     this.modal.show();
//   }

//   createCategoria() {
//   // Validar si ya existe una categoría con el mismo nombre y tipo
//   const nombreNormalizado = this.nombre.trim().toLowerCase();
//   const existe = this.miCat.some(
//     (cat: any) => cat.nombre.trim().toLowerCase() === nombreNormalizado && cat.tipo === this.tipo
//   );

//   if (existe) {
//     alert(`⚠️ Ya existe una categoría "${this.nombre}" del tipo ${this.tipo}.`);
//     return;
//   }

//   const categoria = new FormData();
//   categoria.append('nombre', this.nombre);
//   categoria.append('tipo', this.tipo);

//   this.cat.create(categoria).subscribe({
//     next: () => {
//       this.cargarCategorias();
//       this.modal.hide();
//       console.log(`✅ Categoría creada: ${this.nombre} (${this.tipo})`);
//     },
//     error: (err) => console.error(err)
//   });
// }

cargarCategorias() {
    this.cat.obtenerCategorias(this.tipoCategoria).subscribe({
      next: (categorias) => this.miCat = categorias,
      error: (err) => console.error(err)
    });
  }

  abrirModal(item?: any) {
    this.editando = !!item;
    if (this.editando) {
      this.nombre = item.nombre;
      this.tipo = item.tipo;
      this.idEditando = item.id;
    } else {
      this.nombre = '';
      this.tipo = this.tipoCategoria; // toma el filtro actual
      this.idEditando = null;
    }
    this.nombreDuplicado = false;
    this.modal.show();
  }

  verificarDuplicado() {
    const nombreNormalizado = this.nombre.trim().toLowerCase();
    this.nombreDuplicado = this.miCat.some(
      cat => cat.nombre.trim().toLowerCase() === nombreNormalizado &&
             cat.tipo === this.tipo
    );
  }

  guardarCategoria() {
  const categoria = {
    nombre: this.nombre,
    tipo: this.tipo
  };

  if (this.editando && this.idEditando) {
    this.cat.update(this.idEditando, categoria).subscribe(() => {
      this.cargarCategorias();
      this.modal.hide();
    });
  } else {
    this.cat.create(categoria).subscribe(() => {
      this.cargarCategorias();
      this.modal.hide();
    });
  }
}

  // delete(item: any) {
  //   this.cat.delete(item.id).subscribe(() => this.cargarCategorias());
  // }

  delete(item: Categoria) {
  // 1️⃣ Confirmar eliminación
  const confirmacion = confirm(`¿Seguro que deseas eliminar la categoría "${item.nombre}"?`);
  if (!confirmacion) return; // Si cancela, no hace nada

  // 2️⃣ Intentar eliminar
  this.cat.delete(item.id!).subscribe({
    next: () => {
      alert(`✅ Categoría "${item.nombre}" eliminada correctamente.`);
      this.cargarCategorias();
    },
    error: (err) => {
      console.error(err);

      // 3️⃣ Manejar errores del backend
      if (err.status === 400 || err.status === 409) {
        alert(`⚠️ No se puede eliminar la categoría "${item.nombre}" porque tiene productos o servicios asociados.`);
      } else {
        alert(`❌ Ocurrió un error al intentar eliminar la categoría.`);
      }
    }
  });
}


}

