import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { IntegranteComponent } from './pages/integrante/integrante.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { ListaServiciosComponent } from './pages/lista-servicios/lista-servicios.component';

import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component'

import { AgregarCategoriasComponent } from './pages/agregar-categorias/agregar-categorias.component';
import { AgregarProductosComponent } from './pages/agregar-productos/agregar-productos.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';


import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { AuthClientGuard } from './guards/auth-client.guard';
import { EditarProductosComponent } from './pages/editar-productos/editar-productos.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './pages/pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './pages/pago-pendiente/pago-pendiente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AgregarVehiculoComponent } from './pages/agregar-vehiculo/agregar-vehiculo.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { AgregarReservasComponent } from './pages/agregar-reservas/agregar-reservas.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { EditarVehiculoComponent } from './pages/editar-vehiculo/editar-vehiculo.component';
import { AgregarSucursalesComponent } from './pages/agregar-sucursales/agregar-sucursales.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'quienes-somos/:id', component: IntegranteComponent },
  { path: 'home', component: DashboardComponent },
  //{path: 'home', canActivate:[AuthClientGuard] ,component:DashboardComponent},
  { path: 'contacto', component: ContactoComponent },
  { path: 'sucursales', component: SucursalesComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthClientGuard] },
  { path: 'productos/:id', component: ProductosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: 'articulo/:id', component: ArticuloComponent },
  { path: 'articulo/', component: ArticuloComponent },
  { path: 'servicio/:id', component: ServicioComponent },
  {path:'lista-usuarios',component:ListaUsuariosComponent},
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthAdminGuard] },
  { path: 'lista-productos', component: ListaProductosComponent, canActivate: [AuthAdminGuard] },
  {path: 'lista-servicios', component:ListaServiciosComponent,canActivate: [AuthAdminGuard] },
  { path: 'agregar-categorias', component: AgregarCategoriasComponent, canActivate: [AuthAdminGuard] },
  { path: 'agregar-productos', component: AgregarProductosComponent, canActivate: [AuthAdminGuard] },
  { path: 'editar-categorias/:id', component: EditarCategoriasComponent, canActivate: [AuthAdminGuard] },
  { path: 'editar-productos/:id', component: EditarProductosComponent, canActivate: [AuthAdminGuard] },
  { path: 'pago-exitoso', component: PagoExitosoComponent },
  { path: 'pago-fallido', component: PagoFallidoComponent },
  { path: 'pago-pendiente', component: PagoPendienteComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agregar-vehiculo', component: AgregarVehiculoComponent, canActivate: [AuthClientGuard] },
  { path: 'servicios/:id/reservar', component: ReservaComponent ,canActivate:[AuthClientGuard]},
  { path: 'admin/reservas', component: AgregarReservasComponent ,canActivate: [AuthAdminGuard]},
  { path: 'turnos', component: TurnosComponent , canActivate: [AuthAdminGuard]},
  {path:'panel',component:PanelAdminComponent},
  { path: 'vehiculo/editar/:id', component: EditarVehiculoComponent },
  {path:'lista-sucursales',component:AgregarSucursalesComponent},


  { path: '**', component: Pagina404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
