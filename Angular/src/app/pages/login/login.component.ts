import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/statusrequest';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  showPassword: boolean = false;


  form = this.formBuilders.group({
    email: ['', [Validators.email, Validators.required, Validators.pattern('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$')
  ]],
    password: ['', Validators.required],
  })

  status: RequestStatus = 'init'
  constructor(
    private authService: AuthService,
    private formBuilders: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.form.patchValue({ email }); // trae el correo de registro
      }
    });
  }
  

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  login(e: Event) {
    e.preventDefault()
    if(this.form.valid){
      this.status = 'loading'
      const {email, password} = this.form.getRawValue()
      this.authService.login(email as string, password as string)
      .subscribe({
        next: (resp) => {
          this.status = 'success'
          if(resp.is_admin){
            this.router.navigate(['/cms'])
          }
          this.router.navigate(['/home'])
        },
        error: () => {
          this.status = 'failed'
          setTimeout(() => {
            this.status = 'init'
          }, 2000)
          console.log('error')
        }
      })
      console.log(this.form.value)
    }else {
      this.form.markAllAsTouched()
    }
   }

  //para ver la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
}

}
