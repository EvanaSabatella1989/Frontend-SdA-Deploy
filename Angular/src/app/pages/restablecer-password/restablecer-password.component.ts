import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css']
})
export class RestablecerPasswordComponent {
   email = '';
  message = '';
  resetUrl: string | null = null;

   constructor(private http: HttpClient) {}

  submit() {
    this.http.post<any>(
      `${environment.apiUrl}/password-reset/`,
      { email: this.email }
    ).subscribe(res => {
      this.resetUrl = res.reset_url;
      this.message = 'Hacé click en el enlace para cambiar tu contraseña';
    });
  }
}
