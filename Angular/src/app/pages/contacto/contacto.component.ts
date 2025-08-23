import { FormBuilder,FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/service/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent  implements OnInit {
form: FormGroup;
isLoading = false;  // Bandera para indicar si está cargando


  constructor(private contactoService: ContactoService) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{10,15}$')]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  enviarFormulario() {
    if (this.form.valid) {
      this.isLoading = true;  // Activar el indicador de carga
      this.contactoService.enviarContacto(this.form.value).subscribe({
        next: () => {
          alert('Mensaje enviado con éxito');
          this.form.reset(); // Limpiar formulario después de enviar
        },
        error: () => alert('Error al enviar el mensaje')
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  // get Nombre(){
  //   return this.form.get("nombre");
  //  }

  //  get Email(){
  //   return this.form.get("email");
  //  }

  //  get Mensaje(){
  //   return this.form.get("mensaje");
  //  }

  //  onEnviar(event: Event){
  //   event.preventDefault;
  //   if(this.form.valid){
  //     alert("Enviar al servidor");
  //   }
  //   else{
  //     this.form.markAllAsTouched();
  //   }
  //  }

  ngOnInit(): void {
  }


   }

  

