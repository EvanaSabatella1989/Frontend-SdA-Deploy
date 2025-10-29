import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/statusrequest';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  registrar!: FormGroup;
  status: RequestStatus = 'init'
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  ngOnInit(): void {
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.crearRegistro();
  }

  get nombreNoValido() {
    return this.registrar.get('nombre')?.invalid && this.registrar.get('nombre')?.touched;
  }

  get apellidoNoValido() {
    return this.registrar.get('apellido')?.invalid && this.registrar.get('apellido')?.touched;
  }

  get correoNoValido() {
    return this.registrar.get('correo')?.invalid && this.registrar.get('correo')?.touched;
  }

  get password1NoValido() {
    return this.registrar.get('password1')?.invalid && this.registrar.get('password1')?.touched;
  }

  get password2NoValido() {
    return this.registrar.get('password2')?.invalid && this.registrar.get('password2')?.touched;
  }

  crearRegistro() {
    this.registrar = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {

      Validators: this.passwordIguales('password1', 'password2')
    }
    )
  }

  guardar() {
    this.passNoValido();

    if (this.registrar.invalid) {
      return Object.values(this.registrar.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this.status = 'loading'
    const { nombre, apellido, correo, password1 } = this.registrar.getRawValue()
    this.authService.register(nombre, apellido, correo, password1)
      .subscribe({
        next: () => {
          this.status = 'success'
            this.router.navigate(['/login'], { queryParams: { email: correo } }) //para llevar el correo al login
        },
        error: (e) => {
          this.status = 'failed'
          setTimeout(() => {
            this.status = 'init'
          }, 2000)
          console.log('error')
        }
      })

  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }

  passNoValido() {
    const pass1 = this.registrar.get('password1')?.value;
    const pass2 = this.registrar.get('password2')?.value;

    if (pass1 !== pass2) {
      return true;
    } else {
      return false;
    }
  }

  //para ver la contraseña
  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

}

