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
    private route: ActivatedRoute, private http: HttpClient, private router: Router) {


  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.uid = params.get('uid')!;
      this.token = params.get('token')!;

      console.log('UID:', this.uid);
      console.log('TOKEN:', this.token);
    });
  }

  submit() {

    console.log('ENVIANDO AL BACK:', {
    uid: this.uid,
    token: this.token,
    new_password: this.password
  });
  
    this.http.post(
      `${environment.apiUrl}/password-reset-confirmar/`,
      {
        uid: this.uid,
        token: this.token,
        new_password: this.password
      }
    ).subscribe({
      next: () => {
        this.message = 'Contraseña cambiada correctamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.message = err.error?.error || 'Error al cambiar la contraseña';
      }
    });
  }
}
