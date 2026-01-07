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
  errorMessage: string = '';


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
    return this.registrar.get('first_name')?.invalid && this.registrar.get('first_name')?.touched;
  }

  get apellidoNoValido() {
    return this.registrar.get('last_name')?.invalid && this.registrar.get('last_name')?.touched;
  }

  get correoNoValido() {
    return this.registrar.get('email')?.invalid && this.registrar.get('email')?.touched;
  }

  get password1NoValido() {
    return this.registrar.get('password1')?.invalid && this.registrar.get('password1')?.touched;
  }

  get password2NoValido() {
    return this.registrar.get('password2')?.invalid && this.registrar.get('password2')?.touched;
  }

  get passwordsNoCoinciden(): boolean {
    const pass2 = this.registrar.get('password2');

    return !!(pass2?.hasError('noEsIgual') && pass2?.touched);
  }



  crearRegistro() {
    this.registrar = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(5)]],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {

      validators: this.passwordIguales('password1', 'password2')
    }
    )
  }

  // guardar() {
  //   this.passNoValido();

  //   if (this.registrar.invalid) {
  //     return Object.values(this.registrar.controls).forEach(control => {
  //       control.markAllAsTouched();
  //     })
  //   }

  //   this.status = 'loading'
  //   const { nombre, apellido, correo, password1 } = this.registrar.getRawValue()
  //   this.authService.register(nombre, apellido, correo, password1)
  //     .subscribe({
  //       next: () => {
  //         this.status = 'success'
  //           this.router.navigate(['/login'], { queryParams: { email: correo } }) //para llevar el correo al login
  //       },
  //       error: (e) => {
  //         this.status = 'failed'
  //         setTimeout(() => {
  //           this.status = 'init'
  //         }, 2000)
  //         console.log('error')
  //       }
  //     })

  // }

  guardar() {
    if (this.registrar.get('password2')?.hasError('noEsIgual')) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.status = 'failed';
      return;
    }



    if (this.registrar.invalid) {
      Object.values(this.registrar.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    this.status = 'loading';

    const { first_name, last_name, email, password1, password2 } = this.registrar.getRawValue();

    this.authService.register(first_name, last_name, email, password1, password2)
      .subscribe({
        next: () => {
          // registro exitoso
          this.status = 'success';

          // tiempo para que vea el mensaje
          setTimeout(() => {
            this.router.navigate(['/login'], {
              queryParams: {
                email: email,
                registrado: 'true'
              }
            });
          }, 1500);
        },
        error: (e) => {
          //error 
          this.status = 'failed';

          if (e.error?.email) {
            this.errorMessage = e.error.email[0];

          } else if (e.error?.errors?.email) {
            this.errorMessage = e.error.errors.email[0];
            
          } else {
            this.errorMessage = 'No se pudo completar el registro';
          }

          setTimeout(() => this.status = 'init', 2000);
          console.error('Error al registrar usuario', e);
        }
      });
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



  // passNoValido() {
  //   const pass1 = this.registrar.get('password1')?.value;
  //   const pass2 = this.registrar.get('password2')?.value;

  //   if (pass1 !== pass2) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  //para ver la contraseña
  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

}

