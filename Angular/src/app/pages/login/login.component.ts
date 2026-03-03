import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/statusrequest';
import { AuthService } from 'src/app/service/auth.service';
declare const google: any;

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
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.form.patchValue({ email }); // trae el correo de registro
      }
    });

    // 👇 GOOGLE LOGIN
  google.accounts.id.initialize({
    client_id: '301610184752-v5e8ajeavgokqk99eu2cf7r358k8f8ud.apps.googleusercontent.com301610184752-v5e8ajeavgokqk99eu2cf7r358k8f8ud.apps.googleusercontent.com',
    callback: (response: any) => {
      this.handleGoogleLogin(response);
    }
  });

  google.accounts.id.renderButton(
    document.getElementById('google-btn'),
    { theme: 'outline', size: 'large' }
  );
  }
  

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  // login(e: Event) {
  //   e.preventDefault()
  //   if(this.form.valid){
  //     this.status = 'loading'
  //     const {email, password} = this.form.getRawValue()
  //     this.authService.login(email as string, password as string)
  //     .subscribe({
  //       next: (resp) => {
  //         this.status = 'success'
  //         if(resp.is_admin){
  //           this.router.navigate(['/cms'])
  //         }
  //         this.router.navigate(['/home'])
  //       },
  //       error: () => {
  //         this.status = 'failed'
  //         setTimeout(() => {
  //           this.status = 'init'
  //         }, 2000)
  //         console.log('error')
  //       }
  //     })
  //     console.log(this.form.value)
  //   }else {
  //     this.form.markAllAsTouched()
  //   }
  //  }

  login(e: Event) {
  e.preventDefault();

  if (this.form.valid) {

    this.status = 'loading';
    const { email, password } = this.form.getRawValue();

    this.authService.login(email as string, password as string)
      .subscribe({
        next: (resp) => {

          this.status = 'success';

          
          this.authService.saveSession(resp);

          //  ADMIN
          if (resp.is_admin) {
            this.router.navigate(['/panel']);
          }

          // EMPLEADO 
          else if (resp.cargo) {
            this.router.navigate(['/panel-empleados']);
          }

          //  CLIENTE
          else {
            this.router.navigate(['/home']);
          }

        },
        error: () => {
          this.status = 'failed';

          setTimeout(() => {
            this.status = 'init';
          }, 2000);

          console.log('error');
        }
      });

  } else {
    this.form.markAllAsTouched();
  }
}


  //para ver la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
}

handleGoogleLogin(response: any) {
  const idToken = response.credential;

  this.http.post<any>('https://tu-backend/api/auth/google/', {
    token: idToken
  }).subscribe({
    next: (resp) => {
      
      this.authService.saveSession(resp);

      if (resp.is_admin) {
        this.router.navigate(['/cms']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: () => {
      console.error('Error login con Google');
    }
  });
}


}
