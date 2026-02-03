
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { UsuarioService } from 'src/app/service/usuario.service'
import { VehiculoService } from 'src/app/service/vehiculo.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})

export class PerfilComponent implements OnInit {
  usuario: any = null;
  vehiculos: any[] = [];
  carrito: any[] = [];
  reservas: any[] = [];
  isAdmin: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private vehiculoService: VehiculoService, private router: Router,                
  private servicioService: ServicioService ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(data => {
      this.usuario = data;
      this.vehiculos = data.vehiculos || [];
      this.carrito = data.carrito ? data.carrito.items : [];  // Acceder a items del carrito
      this.authService.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin; //  Actualizar la variable local
      });
      //  this.reservas = data.reservas || [];
      // console.log(this.reservas)

    this.reservas = (data.reservas || []).filter(
  (reserva: any) => reserva.estado !== 'reprogramada'
);



    });
  }

  eliminarVehiculo(id: number): void {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este vehículo?');
  if (confirmacion) {
    this.vehiculoService.eliminarVehiculo(id).subscribe({
      next: () => {
        alert('Vehículo eliminado correctamente');
        // 🔹 Actualizamos la lista local sin recargar toda la página
        this.vehiculos = this.vehiculos.filter(v => v.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar vehículo', err);
      }
    });
  }
}

// isTurnoVencido(turno: any): boolean {
//   // Crear un objeto Date del turno
//   const fechaTurno = new Date(turno.turno_info.fecha + 'T' + turno.turno_info.hora);
//   const ahora = new Date();
//   return fechaTurno < ahora; // true si ya pasó
// }

isTurnoVencido(reserva: any): boolean {
  if (!reserva?.turno_info?.fecha || !reserva?.turno_info?.hora) {
    return false;
  }

  const [year, month, day] = reserva.turno_info.fecha.split('-').map(Number);
  const [hour, minute] = reserva.turno_info.hora.split(':').map(Number);

  const fechaTurno = new Date(
    year,
    month - 1, 
    day,
    hour,
    minute,
    0
  );

  const ahora = new Date();

  return fechaTurno.getTime() < ahora.getTime();
}



cancelarReserva(reservaId: number) {
  console.log('Cancelar reserva', reservaId);
    const ok = confirm('¿Seguro que querés cancelar este turno?');
    if (!ok) return;

    this.servicioService.cancelarReserva(reservaId).subscribe({
      next: () => {
        alert('Reserva cancelada');
        this.reservas = this.reservas.map(r =>
          r.id === reservaId ? { ...r, estado: 'cancelada' } : r
        );
      },
      error: () => alert('No se pudo cancelar la reserva')
    });
  }


reprogramarReserva(reserva: any) {
  console.log('Reserva a reprogramar:', reserva);

  this.servicioService.liberarTurno(reserva.id).subscribe({
    next: () => {
      // nos lleva a reprogramar esa reserva
      this.router.navigate([
        '/servicios',
        reserva.servicio_info.id,
        'reservar'
      ]);
    },
    error: err => {
      console.error(err);
      alert('No se pudo reprogramar el turno');
    }
  });
}

}
