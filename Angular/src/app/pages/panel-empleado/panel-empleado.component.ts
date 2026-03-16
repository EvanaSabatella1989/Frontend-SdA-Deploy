import { Component, ViewChild, ElementRef } from '@angular/core'; 
import { EmpleadoService } from 'src/app/service/empleado.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-panel-empleado',
  templateUrl: './panel-empleado.component.html',
  styleUrls: ['./panel-empleado.component.css'],
})
export class PanelEmpleadoComponent {
  reservas: any[] = [];
  modo: 'pendientes' | 'reservas_mes'| 'mis_trabajos' | 'finalizados' = 'pendientes' ;
  misTrabajos: any[] = [];
  ordenSeleccionada: any = null;
  reservasMes: any[] = [];
  misTrabajosFinalizados: any[] = [];
  @ViewChild('tablaSeccion') tablaSeccion!: ElementRef;

  stats = {
    reservasHoy: 0,
    reservasMes: 0,
    pendientes: 0,
    enTaller: 0,
    finalizados: 0
  };
  constructor(
    private serviceEmpleado: EmpleadoService) { }

  ngOnInit() {
    this.cargarReservas();
    this.cargarReservasMes();
    this.cargarMisTrabajos();
  }

     // traer reservas pendientes

  cargarReservasMes() {
    this.serviceEmpleado.getReservasMesEmpleado().subscribe({
      next: (data) => {
        console.log("Reservas del mes recibidas:", data);  // 👈 AQUÍ
        this.reservasMes = data;

        // contadores
        this.stats.reservasMes = data.length;
        // this.stats.pendientes = data.filter((r: any) => r.estado === 'pendiente').length;
      },
      error: (err) => console.error("Error trayendo reservas del mes:", err)
    });
  }

  cargarReservas() {
    this.serviceEmpleado.getReservasHoyEmpleado().subscribe({
      next: (data) => {
        this.reservas = data;
        this.stats.reservasHoy = data.length;
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
      this.misTrabajos = data.filter(
        (orden: any) => orden.estado === 'pendiente' || orden.estado === 'en_proceso'
      );

      this.stats.enTaller = data.filter(
        (orden: any) => orden.estado === 'pendiente' || orden.estado === 'en_proceso'
      ).length;

      this.stats.finalizados = data.filter(
        (orden: any) => orden.estado === 'entregado' || orden.estado === 'finalizado'
      ).length;

      // filtrar solo finalizados
      this.misTrabajosFinalizados = data.filter(
        (orden: any) => orden.estado === 'entregado' || orden.estado === 'finalizado'
      );
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

scrollATabla() {
  setTimeout(() => {
    this.tablaSeccion?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
}

  mostrarReservasMes(){
    this.modo = 'reservas_mes';
    this.scrollATabla();
  }

  mostrarReservasHoy(){
    this.modo = 'pendientes';
    this.scrollATabla();
  }

  mostrarTrabajosAsignados(){
    this.modo = 'mis_trabajos';
    this.cargarMisTrabajos();
    this.scrollATabla();
  }

  mostrarTrabajosFinalizados(){
    this.modo = 'finalizados';
    this.cargarMisTrabajos();
    this.scrollATabla();
  }
}
