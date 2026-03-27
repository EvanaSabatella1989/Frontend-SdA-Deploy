import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/statusrequest';
import { AuthService } from 'src/app/service/auth.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]],
      password1: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator('first_name', 'last_name', 'email')
        ]
      ],
      password2: ['', Validators.required],
    }, {
      validators: this.passwordIguales('password1', 'password2')
    });
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
    this.errorMessage = '';

    // contraseñas distintas (frontend)
    if (this.registrar.hasError('noEsIgual')) {
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

    const { first_name, last_name, email, password1, password2 } =
      this.registrar.getRawValue();

    this.authService.register(first_name, last_name, email, password1, password2)
      .subscribe({
        next: () => {
          this.status = 'success';

          setTimeout(() => {
            this.router.navigate(['/login'], {
              queryParams: { email, registrado: 'true' }
            });
          }, 1500);
        },

        error: (e) => {
          this.status = 'failed';

          // email duplicado
          if (e.error?.email) {
            this.errorMessage = e.error.email[0];
          }

          // contraseñas no coinciden back
          else if (e.error?.password2) {
            this.errorMessage = e.error.password2[0];
          }

          // errores de contraseña Django
          else if (e.error?.password1) {
            const msg = e.error.password1[0];

            if (msg.includes('numeric')) {
              this.errorMessage = 'La contraseña no puede ser solo números, debe tener letras o al menos 1 caracteres';
            } else if (msg.includes('common')) {
              this.errorMessage = 'La contraseña es demasiado común';
            } else if (msg.includes('similar')) {
              this.errorMessage = 'La contraseña es muy parecida a tus datos personales';
            } else if (msg.includes('especial')) {
              this.errorMessage = 'La contraseña debe tener al menos un carácter especial';
            }else {
              this.errorMessage = msg;
            }
          }

          // fallback
          else {
            this.errorMessage = 'No se pudo completar el registro';
          }

          setTimeout(() => this.status = 'init', 3000);
          console.error('Error al registrar usuario', e);
        }
      });
  }


  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (!pass1Control || !pass2Control) return;

      if (pass1Control.value === pass2Control.value) {
        if (pass2Control.hasError('noEsIgual')) {
          const errors = { ...pass2Control.errors };
          delete errors['noEsIgual'];

          pass2Control.setErrors(
            Object.keys(errors).length ? errors : null
          );
        }
      } else {
        pass2Control.setErrors({
          ...pass2Control.errors,
          noEsIgual: true
        });
      }
    };
  }


  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  passwordStrengthValidator(firstNameKey: string, lastNameKey: string, emailKey: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;

      const password = control.value as string;
      if (!password) return null;

      const firstName = control.parent.get(firstNameKey)?.value || '';
      const lastName = control.parent.get(lastNameKey)?.value || '';
      const email = control.parent.get(emailKey)?.value || '';

      const errors: ValidationErrors = {};

      if (password.length < 8) {
        errors['minLength'] = true;
      }

      if (/^\d+$/.test(password)) {
        errors['onlyNumbers'] = true;
      }

      if (!/[^a-zA-Z0-9]/.test(password)) {
        errors['noSpecialChar'] = true;
      }

      const lower = password.toLowerCase();
      if (
        (firstName && lower.includes(firstName.toLowerCase())) ||
        (lastName && lower.includes(lastName.toLowerCase())) ||
        (email && lower.includes(email.split('@')[0].toLowerCase()))
      ) {
        errors['similarData'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    };
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


