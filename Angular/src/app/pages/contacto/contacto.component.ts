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
isLoading = false; 


  constructor(private contactoService: ContactoService) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  enviarFormulario() {
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.isLoading = true;

    this.contactoService.enviarContacto(this.form.value).subscribe({
      next: () => {
        alert('✅ Mensaje enviado con éxito. ¡Gracias por contactarnos!');
        this.form.reset();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al enviar el mensaje. Intente nuevamente.');
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {}
}

  

