import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
modulosAdmin = [
  { titulo: 'Productos', descripcion: 'CRUD de productos', ruta: '/lista-productos', icono: 'bi bi-box' },
  { titulo: 'Servicios', descripcion: 'CRUD de servicios', ruta: '/lista-servicios', icono: 'bi bi-tools' },
  { titulo: 'Reservas', descripcion: 'Gestionar reservas', ruta: '/admin/reservas', icono: 'bi bi-calendar-check' },
  { titulo: 'Turnos', descripcion: 'Asignar turnos', ruta: '/turnos', icono: 'bi bi-clock' },
  { titulo: 'Usuarios', descripcion: 'Administrar usuarios', ruta: '/lista-usuarios', icono: 'bi bi-people' },


  { titulo: 'Sucursales', descripcion: 'Administrar sucursales', ruta: '/lista-sucursales', icono: 'bi bi-building' }
];

}
