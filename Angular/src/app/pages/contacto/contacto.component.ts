import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/service/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent  implements OnInit {
form: FormGroup;
cargando: boolean = false;
enviado: boolean = false;


  constructor(private contactoService: ContactoService) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  enviarFormulario() {

  if (this.form.invalid) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  this.cargando = true;
  this.enviado = false;

  this.contactoService.enviarContacto(this.form.value).subscribe({
    next: () => {
      this.cargando = false;
      this.enviado = true;

      this.form.reset();
    },
    error: (err) => {
      console.error(err);
      this.cargando = false;
      this.enviado = false;

      alert('❌ Error al enviar el mensaje. Intente nuevamente.');
    }
  });
}

  ngOnInit(): void {}
}

  

