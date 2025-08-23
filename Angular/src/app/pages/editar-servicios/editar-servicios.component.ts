import { Component } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';


@Component({
  selector: 'app-editar-servicios',
  templateUrl: './editar-servicios.component.html',
  styleUrls: ['./editar-servicios.component.css']
})
export class EditarServiciosComponent {
  // servicio: Servicio = Object();
  servicio: Servicio = { id: 0, nombre: '', descripcion: '', precio: 0, imagen: '' };
  imagenSeleccionada?: File | null=null;

  constructor(private servicioService: ServicioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); //  convierto el id a número
    if (id) {
      this.servicioService.obtenerServicio(id).subscribe(
        (data) => {
          this.servicio = data; //guardar el servicio recibido
        },
        (error) => console.error('Error al obtener servicio', error)
      );
    }

}

//metodo para actualizar
actualizarServicio(): void {
  if (!this.servicio.id) {
    console.error('Error: El ID del servicio no está definido');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', this.servicio.nombre ?? '');
  formData.append('descripcion', this.servicio.descripcion ?? '');
  formData.append('precio', this.servicio.precio.toString());

  // solo agrega la imagen si el usuario la cambió
  if (this.imagenSeleccionada) {
    formData.append('imagen', this.imagenSeleccionada);
  }

  this.servicioService.actualizarServicio(this.servicio.id, formData).subscribe(
    () => {
      alert('Servicio actualizado con éxito');
      this.router.navigate(['/lista-servicios']);
    },
    (error) => {
      console.error('Error al actualizar servicio', error);
    }
  );
}

// metodo para tomar la imagen
enviarFoto(event: any): void {
  if (event.target.files.length > 0) {
    this.imagenSeleccionada = event.target.files[0];
  }
}

// metodo para eliminar el servicio
onDelete(): void {
  const id = this.servicio?.id;

  if (id === undefined) {
    console.error('Error: El ID del servicio no está definido');
    return;
  }

  if (confirm('¿Estás seguro de eliminar este servicio?')) {
    this.servicioService.eliminarServicio(id).subscribe(
      () => {
        alert('Servicio eliminado con éxito');
        this.router.navigate(['/lista-servicios']);
      },
      (error) => {
        console.error('Error al eliminar servicio', error);
      }
    );
  }
}
}

  // ngOnInit(): void {
  //   const id = this.activatedRouter.snapshot.params['id'];
  //   this.servicioService.detail(id).subscribe(
  //     data => {
  //       this.servicio = data;


  //     }, err => {
  //       alert("Error al traer la categoria");
  //       this.router.navigate(['']);
  //     }
  //   )
  // }

  // guardarNombre(event: any) {
  //   console.log(this.servicio.nombre = event.target.value)
  // }

  // guardarDescripcion(event: any) {
  //   console.log(this.servicio.descripcion = event.target.value)
  // }

  // guardarPrecio(event: any) {
  //   console.log(this.servicio.precio = event.target.value)
  // }

  // guardarFecha(event: any) {
  //   console.log(this.servicio.fecha_creacion = event.target.value)
  // }

  // enviarFoto(event: any) {
  //   console.log(this.servicio.imagen = event.target.files[0])
  // }


  // onUpdate(): void {
  //   console.log("Se guardó la modificación del servicio: ", this.servicio);
  
  //   // Verifica si el ID del servicio existe
  //   if(!this.servicio.id) {
  //     console.log('ID no encontrado');
  //     return;
  //   }
  
  //   // Crea un FormData para enviar los datos y la imagen (si hay)
  //   const formData = new FormData();
  //   formData.append('id', String(this.servicio.id)); // Convierte el ID a string
  
  //   // Verificar y agregar los campos si no son undefined
  //   if (this.servicio.nombre) {
  //     formData.append('nombre', this.servicio.nombre);
  //   } else {
  //     console.log("Nombre no definido");
  //   }
  
  //   if (this.servicio.descripcion) {
  //     formData.append('descripcion', this.servicio.descripcion);
  //   } else {
  //     console.log("Descripción no definida");
  //   }
  
  //   if (this.servicio.precio !== undefined) {
  //     formData.append('precio', this.servicio.precio.toString());
  //   } else {
  //     console.log("Precio no definido");
  //   }
  
  //   if (this.servicio.fecha_creacion) {
  //     formData.append('fecha_creacion', this.servicio.fecha_creacion);
  //   } else {
  //     console.log("Fecha de creación no definida");
  //   }
  
  //   // Si hay imagen, añádela también al FormData
  //   if (this.servicio.imagen) {
  //     formData.append('imagen', this.servicio.imagen);
  //   } else {
  //     console.log("Imagen no definida");
  //   }
  
  //   // Llama al servicio para enviar el FormData
  //   this.servicioService.update(this.servicio.id, formData).subscribe(
  //     data => {
  //       console.log("Servicio actualizado exitosamente:", data);
  //       this.router.navigate(['/servicios']);
  //     },
  //     err => {
  //       console.error("Error al actualizar el servicio:", err);
  //     }
  //   );
  
  
    // this.servicioService.update(this.servicio.id, this.servicio).subscribe(
    //   data => {

    //     console.log("se guardo la modificacion del servicio " + this.servicio.imagen?.name);
    //     console.log("se al modificar la servicio ", this.servicio);

    //   }, err => {
    //     console.log(err)
       
    //     console.log("Error al modificar la servicio ", this.servicio);
    //   }
    // )
  






  // submit() {
  // // form = new FormGroup({
  // //   nombre: new FormGroup('', Validators.required),
  // //   imagen: new FormGroup('', Validators.required),
  // //   descripcion: new FormGroup('', Validators.required),
  // //   precio: new FormGroup('', Validators.required),
  // // })
  //   this.servicioService.update(this.servicio.id, this.servicio).subscribe(
  //     data => {
  //       this.servicio.nombre = this.nombre;
  //       this.servicio.descripcion = this.descripcion;
  //       this.servicio.precio = this.precio;
  //       this.servicio.imagen = this.imagen;

  //       console.log(data)
  //       console.log(this.servicio)
  //     }),
  //     (err:any) =>{
  //       console.log(err)
  //       console.log(this.servicio)
  //     }

  //   this.router.navigate(['/lista-servicios'])
  // }

