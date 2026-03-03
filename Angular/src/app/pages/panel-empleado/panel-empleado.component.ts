import { Component } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-panel-empleado',
  templateUrl: './panel-empleado.component.html',
  styleUrls: ['./panel-empleado.component.css']
})
export class PanelEmpleadoComponent {
  reservas: any[] = [];

  constructor(
    private serviciosService: ServicioService,) { }

ngOnInit() {
  this.cargarMisReservas();
}

  cargarMisReservas() {
    this.serviciosService.getReservasHoyEmpleado().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  tomarReserva(id: number) {
  this.serviciosService.tomarReserva(id).subscribe({
    next: () => {
      alert("Reserva tomada correctamente");
      this.cargarMisReservas();
    },
    error: (err) => {
      alert(err.error.detail);
    }
  });
}
}
