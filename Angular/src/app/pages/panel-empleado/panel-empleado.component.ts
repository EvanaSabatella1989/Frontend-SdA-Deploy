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
ordenSeleccionada: any = null;

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

  // seleccionar orden para editar
  editarOrden(orden: any){
  this.ordenSeleccionada = {...orden};
}

guardarOrden() {
  if (!this.ordenSeleccionada) return;

  const data = {
    diagnostico: this.ordenSeleccionada.diagnostico,
    observaciones: this.ordenSeleccionada.observaciones,
    estado: this.ordenSeleccionada.estado
  };

  this.serviceEmpleado.actualizarOrden(this.ordenSeleccionada.id, data).subscribe({
    next: () => {
      alert("Orden actualizada correctamente");
      this.ordenSeleccionada = null;
      this.cargarMisTrabajos();
    },
    error: (err) => console.error(err)
  });
}
}
