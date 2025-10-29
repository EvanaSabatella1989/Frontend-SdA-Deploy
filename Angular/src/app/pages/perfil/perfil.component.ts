
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(data => {
      this.usuario = data;
      this.vehiculos = data.vehiculos || [];
      this.carrito = data.carrito ? data.carrito.items : [];  // Acceder a items del carrito
      this.reservas = data.reservas || [];
      console.log(this.reservas)
      this.authService.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin; // 🔹 Actualizar la variable local
      });
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

isTurnoVencido(turno: any): boolean {
  // Crear un objeto Date del turno
  const fechaTurno = new Date(turno.turno_info.fecha + 'T' + turno.turno_info.hora);
  const ahora = new Date();
  return fechaTurno < ahora; // true si ya pasó
}
}
