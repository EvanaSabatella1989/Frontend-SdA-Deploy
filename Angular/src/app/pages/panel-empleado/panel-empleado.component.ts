import { Component } from '@angular/core';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-panel-empleado',
  templateUrl: './panel-empleado.component.html',
  styleUrls: ['./panel-empleado.component.css']
})
export class PanelEmpleadoComponent {
  reservas: any[] = [];
  modo: 'pendientes' | 'mis_trabajos' = 'pendientes';
misTrabajos: any[] = [];

  constructor(
    private serviceEmpleado: EmpleadoService) { }

  ngOnInit() {
    this.cargarReservas();
  }

     // traer reservas pendientes
  cargarReservas() {
    this.serviceEmpleado.getReservasHoyEmpleado().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (err) => console.error(err)
    });
  }

  // tomar reserva
  tomarReserva(id: number) {
    this.serviceEmpleado.tomarReserva(id).subscribe({
      next: () => {
        alert("Reserva tomada correctamente");
        this.modo = 'mis_trabajos';
        this.cargarMisTrabajos();
        this.cargarReservas();
      },
      error: (err) => alert(err.error.detail)
    });
  }

  // traer mis órdenes
  cargarMisTrabajos() {
    this.serviceEmpleado.getMisTrabajos().subscribe({
      next: (data) => {
        this.misTrabajos = data;
      },
      error: (err) => console.error(err)
    });
  }

  // cambiar estado orden
  cambiarEstado(id: number, estado: string) {
    this.serviceEmpleado.cambiarEstadoOrden(id, estado).subscribe({
      next: () => {
        this.cargarMisTrabajos();
      },
      error: (err) => console.error(err)
    });
  }
}
