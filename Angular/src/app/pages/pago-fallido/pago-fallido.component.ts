import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  templateUrl: './pago-fallido.component.html',
  styleUrls: ['./pago-fallido.component.css']
})
export class PagoFallidoComponent {
  constructor(private router: Router) {}

  volverInicio() {
    this.router.navigate(['/']);
  }

  reintentarPago() {
    this.router.navigate(['/carrito']); // Redirige al carrito para reintentar
  }
}
