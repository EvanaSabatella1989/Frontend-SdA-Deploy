import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { Sucursal } from 'src/app/models/sucursal';
import { ServicioService } from 'src/app/service/servicio.service';
declare var bootstrap: any;
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent {

  miList: any;
  miServi: any;
  isLogged: boolean = false;
  isAdmin: boolean = false;  // verifica si el usuario es admin
  servicioActual: Servicio | null = null;
  servicioForm!: FormGroup;
  imagenSeleccionada?: File | null = null;
  modalInstance: any;
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  categorias: any[] = [];
  categoriaSeleccionada: number | null = null;
  catSelec: any = { id: 0, nombre: 'Todos' };
  sucursales: any[] = [];
  sucursalSeleccionada: number | null = null;


  constructor(private sucursalService: ServicioService,private list: ServicioService, private activatedRouter: ActivatedRoute, private router: Router) {

  }


  ngOnInit(): void {
    this.listarServicios()
    

    //Traer categorías de servicio
    this.list.obtenerCategorias('servicio').subscribe({
      next: (resp) => {
        this.categorias = resp;
        console.log("Categorías de servicios cargadas", this.categorias);

        this.list.obtenerSucursales().subscribe({
        next: (respSuc) => {
          this.sucursales = respSuc;
          console.log("Sucursales cargadas", this.sucursales);

          // Ahora sí, cargamos los servicios
          this.listarServicios();
      },
      
     error: (error) => console.error("Error al traer sucursales:", error)
      });
    },
    error: (error) => {
      console.error("Error al traer categorías de servicios", error);
    }
  });
}


  listarServicios() {
  this.list.obtenerServiciosConSucursales().subscribe({
    next: (todaLaLista) => {
      this.miList = todaLaLista.map((s: any) => {
        const categoriaEncontrada = this.categorias.find(c => c.id === s.categoria);
        const sucursalesNombres = s.sucursales?.map((suc: any) => suc.nombre).join(', ') || 'sin sucursal';
        return {
          ...s,
          categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría',
          sucursalNombre: sucursalesNombres
        };
      });
      console.log("Servicios cargados con categoría y sucursales:", this.miList);
    },
    error: (errorData) => {
      console.log("no cargo lista");
      console.log(errorData);
      this.router.navigate(['']);
    }
  });
}



  abrirModal(servicio?:Servicio){
    this.servicioActual=servicio || null;

    if(servicio){
       this.nombre = servicio.nombre ?? '';
      this.descripcion = servicio.descripcion ?? '';
      this.precio = servicio.precio;
      this.sucursalSeleccionada=servicio.sucursal?.id ?? null;
      
    } else {
      this.nombre = '';
      this.descripcion = '';
      this.precio = 0;
      this.imagenSeleccionada = null;
       this.sucursalSeleccionada = null;
    }

    const modalEl = document.getElementById('modalServicio');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }


  

  seleccionarImagen(event: any): void {
    if (event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    }
  }

  guardarServicio(){

     if (!this.nombre?.trim() || !this.descripcion?.trim() || this.precio == null) {
      alert('⚠️ Todos los campos son obligatorios.');
      return;
    }

   

    //    if (!this.sucursalSeleccionada) {
    // alert("⚠️ Debes seleccionar una sucursal");
    // console.log('ver sucursal'+this.sucursalSeleccionada);
    // return;
  //}


    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio.toString());
    // formData.append('sucursal', this.sucursalSeleccionada.toString());

    
   if (this.categoriaSeleccionada) {
      formData.append('categoria', this.categoriaSeleccionada.toString());
    } else {
      alert("⚠️ Debes seleccionar una categoría");
      return;
    }
 

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    if (this.servicioActual?.id) {
      if (!window.confirm('Deseas actualizar este servicio?')) return;

      this.list.actualizarServicio(this.servicioActual.id, formData).subscribe({
      next: () => {
        alert('✅ Servicio actualizado con éxito');
        this.listarServicios();
        this.modalInstance.hide();
      },
      error: (error) => {
        console.error(error);
        alert('❌ Error al actualizar servicio.');
      }
    });
  } else {
    this.list.crearServicio(formData).subscribe({
      next: () => {
        alert('✅ Servicio creado con éxito');
        this.listarServicios();
        this.modalInstance.hide();
      },
      error: (error) => {
        console.error(error);
        alert('❌ Error al crear servicio.');
      }
    });
  }
}

  delete(item: any) {
    if(window.confirm(`⚠️ Deseas eliminar el servicio :"${item.nombre}"?`)){
    this.miList.forEach((servicio: any) => {
      if (servicio.id == item.id) {
        alert('✅ Servicio eliminado con éxito');
        this.list.eliminarServicio(item.id).subscribe(
          res => this.list.obtenerServicios().subscribe(
            Response => this.miList = Response
          )
        );
        console.log('borre el servicio numero :' + item.id);
      }
    });
  }
  }
}