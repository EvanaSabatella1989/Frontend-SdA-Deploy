import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent {

  miList: any;
  
   
  constructor(private list: ServicioService, private activatedRouter: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.listarServicios()

  }

  listarServicios() {
    this.list.obtenerServicios().subscribe({
      next: (todaLaLista) => {
        this.miList = todaLaLista;
        console.log("cargo toda la lista");
        console.log(this.miList);
      },
      error: (errorData) => {
        console.log("no cargo lista");
        console.log(errorData);
        this.router.navigate(['']);
      }
    })
  }

  delete(item: any) {
    if (window.confirm(`⚠️ ¿Estás seguro de que quieres eliminar el servicio "${item.nombre}"? Esta acción no se puede deshacer.`)) {
      this.list.eliminarServicio(item.id).subscribe(
        () => {
          alert(`✅ Servicio "${item.nombre}" eliminado correctamente.`);
          this.list.obtenerServicios().subscribe(
            (response) => this.miList = response,
            (error) => console.error('Error al obtener servicios después de eliminar:', error)
          );
        },
        (error) => {
          alert('❌ Error al eliminar el servicio. Inténtalo de nuevo.');
          console.error('Error al eliminar el servicio:', error);
        }
      );
    } else {
      alert('⚠️ Eliminación cancelada.');
    }
  }
  
    
  
  }