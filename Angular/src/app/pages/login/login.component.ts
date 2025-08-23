import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/statusrequest';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.formBuilders.group({
    email: ['', [Validators.email, Validators.required, Validators.pattern('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$')
  ]],
    password: ['', Validators.required],
  })

  status: RequestStatus = 'init'
  constructor(
    private authService: AuthService,
    private formBuilders: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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

}
