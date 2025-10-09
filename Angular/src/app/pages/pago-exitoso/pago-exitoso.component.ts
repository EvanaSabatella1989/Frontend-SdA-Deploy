// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-pago-exitoso',
//   templateUrl: './pago-exitoso.component.html',
//   styleUrls: ['./pago-exitoso.component.css']
// })
// export class PagoExitosoComponent {
//   constructor(private router: Router) {}

//   volverInicio() {
//     this.router.navigate(['/']); // Redirige al home o donde desees
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css']
})
export class PagoExitosoComponent implements OnInit {
  paymentId: string | null = null;
  status: string | null = null;
  private apiUrl = 'https://backend-sda-deploy.onrender.com/api/venta/confirmar-pago';  // Ajusta la URL según tu backend

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      this.status = params['status'];

      if (this.status === 'approved' && this.paymentId) {
        this.confirmarPago(this.paymentId);
      }
    });
  }

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Recuperar el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token al header
        'Content-Type': 'application/json'
      });
    }
  

  confirmarPago(paymentId: string) {
    const body = { status: 'approved', payment_id: paymentId };

    this.http.post(this.apiUrl, body, { headers: this.getHeaders()}).subscribe(
      response => console.log('Pago confirmado con éxito', response),
      error => console.error('Error al confirmar pago', error)
    );
  }

    volverInicio() {
    this.router.navigate(['/']); // Redirige al home o donde desees
  }
}
