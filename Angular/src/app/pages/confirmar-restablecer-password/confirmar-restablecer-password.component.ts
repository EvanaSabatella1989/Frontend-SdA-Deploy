import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmar-restablecer-password',
  templateUrl: './confirmar-restablecer-password.component.html',
  styleUrls: ['./confirmar-restablecer-password.component.css']
})
export class ConfirmarRestablecerPasswordComponent {
  password = '';
  message = '';
  uid!: string;
  token!: string;
  showPassword = false;

  constructor(
    private route: ActivatedRoute,private http: HttpClient,private router: Router) {
 }

   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('uid')!;
      this.token = params.get('token')!;
    });
  }


  submit() {
    this.http.post(
      `${environment.apiUrl}/password-reset-confirmar/`,
      {
        uid: this.uid,
        token: this.token,
        new_password: this.password
      }
    ).subscribe(() => {
      this.message = 'Contraseña cambiada correctamente. Redirigiendo al login...';

      setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); 
    });
  }
}
