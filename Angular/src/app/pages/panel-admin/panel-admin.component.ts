import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
  modulosAdmin = [
    { titulo: 'Categorias', descripcion: 'CRUD de categorías', ruta: '/categorias', icono: 'bi bi-tags' },
    { titulo: 'Productos', descripcion: 'CRUD de productos', ruta: '/lista-productos', icono: 'bi bi-box' },
    { titulo: 'Servicios', descripcion: 'CRUD de servicios', ruta: '/lista-servicios', icono: 'bi bi-tools' },
    { titulo: 'Reservas', descripcion: 'Gestionar reservas', ruta: '/admin/reservas', icono: 'bi bi-calendar-check' },
    { titulo: 'Turnos', descripcion: 'Asignar turnos', ruta: '/turnos', icono: 'bi bi-clock' },
    { titulo: 'Usuarios', descripcion: 'Administrar usuarios', ruta: '/lista-usuarios', icono: 'bi bi-people' },
    { titulo: 'Sucursales', descripcion: 'Administrar sucursales', ruta: '/lista-sucursales', icono: 'bi bi-building' },
    { titulo: 'Ventas', descripcion: 'Ver ventas realizadas', ruta: '/lista-ventas', icono: 'bi bi-receipt' }
  ];

  stats = {
    reservasHoy: 12,
    enTaller: 5,
    pendientes: 8,
    finalizados: 23
  };

}
