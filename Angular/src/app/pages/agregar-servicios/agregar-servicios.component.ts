import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { Servicio } from 'src/app/models/servicio';


@Component({
  selector: 'app-agregar-servicios',
  templateUrl: './agregar-servicios.component.html',
  styleUrls: ['./agregar-servicios.component.css']
})
export class AgregarServiciosComponent {

  // nuevoServicio: Servicio = new Servicio();
  //servicio :any =[];

  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  fecha_creacion: string = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  imagen?: File;

  constructor(private servicioServicio: ServicioService, private router: Router) {

  }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0]; // Guardar la imagen seleccionada
    }
  }
  

  create(): void {
    if (!this.nombre || !this.descripcion || !this.precio) {
      alert('⚠️ Todos los campos excepto la imagen son obligatorios.');
      return;
    }
  
    if (!window.confirm('¿Confirmas la creación de este servicio?')) {
      alert('⏳ Creación cancelada.');
      return;
    }
  
    const nuevoServicio: Servicio = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio
    };
  
    this.servicioServicio.crearServicio(nuevoServicio, this.imagen).subscribe(
      () => {
        alert('✅ Servicio creado con éxito.');
        this.router.navigate(['/lista-servicios']);
      },
      (error) => {
        alert('❌ Error al crear el servicio. Inténtalo de nuevo.');
        console.error('Error al crear el servicio:', error);
      }
    );
  }
}
  



