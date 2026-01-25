import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
// import { TokenService } from 'src/app/service/token.service';
declare var bootstrap: any;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  miServi: any[] = [];
  serviciosFiltrados: any[] = [];
  isLogged: boolean = false;
  isAdmin: boolean = false;  
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
  sucursales: any[] = [];         // todas las sucursales
sucursalSeleccionada: any = { id: 0, nombre: 'Todas' };

  constructor(
    // private tokenService: TokenService, 
    private authService: AuthService, 
    private serv: ServicioService, 
    private activatedRouter: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder) {

  }

   ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp);
    this.isAdmin = this.authService.getIsAdmin();
    // Traer categorías
    this.serv.obtenerCategorias('servicio').subscribe({
      next: (resp) => {
        this.categorias = resp;
        this.cargarServicios();
      },
      error: (error) => console.error("Error al traer categorías:", error)
    });
    this.cargarSucursales();
  }

  cargarServicios(): void {
    this.serv.obtenerServicios().subscribe({
      next: (serviciosTodos) => {
        this.miServi = serviciosTodos.map((s: any) => {
          const categoriaEncontrada = this.categorias.find(c => c.id === s.categoria);
          return {
            ...s,
            categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría'
          };
        });

        this.serviciosFiltrados = [...this.miServi];
      },
      error: (errorData) => {
        console.error('Error cargando servicios', errorData);
        this.router.navigate(['']);
      }
    });
  }

  irAAgregarTurnos(servicioId: number): void {
    this.router.navigate(['/admin/turnos', servicioId]);
  }

  // filtrarPorCategoria(cat: any) {
  //   this.catSelec = cat;
  //   this.serviciosFiltrados = cat.id === 0
  //     ? [...this.miServi]
  //     : this.miServi.filter(s => s.categoria === cat.id);
  // }

  filtrarPorCategoria(cat: any) {
    this.catSelec = cat;
    this.aplicarFiltros();
    this.cerrarFiltrosMobile();
  }

  irAReservar(servicioId: number) {
    if (!this.isLogged) {
      alert('Debes iniciar sesión para reservar un servicio.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/servicios', servicioId, 'reservar']);
  }

  cargarSucursales() {
  this.serv.obtenerSucursales().subscribe({
    next: (data) => {
      console.log("ver las sucursales cargadas",data);
      this.sucursales = data;
    },
    error: (err) => console.error(err)
  });
}

// Filtrar por sucursal
// filtrarPorSucursal(suc: any) {
//   this.sucursalSeleccionada = suc;
//   if (suc.id === 0) {
//     this.serviciosFiltrados = [...this.miServi];  
//   } else {
//     this.serv.obtenerServiciosPorSucursal(suc.id).subscribe({
//       next: (resp) => this.serviciosFiltrados = resp,
//       error: (err) => console.error(err)
//     });
//   }
// }

filtrarPorSucursal(suc: any) {
  this.sucursalSeleccionada = suc;
  this.aplicarFiltros();
  this.cerrarFiltrosMobile();
}


  // delete(item: Servicio) {
  //   if (window.confirm(`⚠️ ¿Seguro que deseas eliminar "${item.nombre}"?`)) {
  //     this.serv.eliminarServicio(item.id!).subscribe({
  //       next: () => {
  //         alert(`✅ Servicio "${item.nombre}" eliminado.`);
  //         this.cargarServicios();
  //       },
  //       error: (error) => {
  //         console.error('Error eliminando servicio:', error);
  //         alert('❌ No se pudo eliminar el servicio.');
  //       }
  //     });
  //   }
  // }

  onCategoriaClick(cat: any, event: MouseEvent) {
  // Si hace click en la ya seleccionada → no permitir des-check
  if (this.catSelec.id === cat.id) {
    event.preventDefault();
    return;
  }

  // Cambiar selección
  this.catSelec = cat;
  this.aplicarFiltros();
  this.cerrarFiltrosMobile();
}

onSucursalClick(suc: any, event: MouseEvent) {
  if (this.sucursalSeleccionada.id === suc.id) {
    event.preventDefault();
    return;
  }

  this.sucursalSeleccionada = suc;
  this.aplicarFiltros();
  this.cerrarFiltrosMobile();
}


  aplicarFiltros() {

    let servicios = [...this.miServi];

    // 🔹 Filtro por categoría
    if (this.catSelec.id !== 0) {
      servicios = servicios.filter(
        s => s.categoria === this.catSelec.id
      );
    }

    // 🔹 Filtro por sucursal
    if (this.sucursalSeleccionada.id !== 0) {

      const idsServiciosSucursal = this.sucursalSeleccionada.servicios
        .map((s: any) => s.id);

      servicios = servicios.filter(
        s => idsServiciosSucursal.includes(s.id)
      );
    }

    this.serviciosFiltrados = servicios;
    
}

cerrarFiltrosMobile() {
  const filtros = document.getElementById('filtrosMobile');

  if (filtros && window.innerWidth < 768) {
    const bsCollapse = bootstrap.Collapse.getInstance(filtros)
      || new bootstrap.Collapse(filtros);

    bsCollapse.hide();
  }
}

}