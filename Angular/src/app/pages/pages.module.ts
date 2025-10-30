import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { RouterModule } from '@angular/router';
import { Pagina404Component } from './pagina404/pagina404.component';
import { IntegranteComponent } from './integrante/integrante.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { CardProductComponent } from './carrito/components/card-product/card-product.component';
import { LayoutModule } from '../layout/layout.module';
import { ProductosComponent } from './productos/productos.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ServicioComponent } from './servicio/servicio.component';

import { CategoriasComponent } from './categorias/categorias.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './pago-pendiente/pago-pendiente.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { ReservaComponent } from './reserva/reserva.component';

import { TurnosComponent } from './turnos/turnos.component';
import { AgregarReservasComponent } from './agregar-reservas/agregar-reservas.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarVehiculoComponent } from './editar-vehiculo/editar-vehiculo.component';

import { AgregarSucursalesComponent } from './agregar-sucursales/agregar-sucursales.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ServiciosComponent,
    QuienesSomosComponent,
    Pagina404Component,
    IntegranteComponent,
    SucursalesComponent,
    ContactoComponent,
    RegistrarseComponent,
    LoginComponent,
    CarritoComponent,
    PreguntasFrecuentesComponent,
    CardProductComponent,
    ProductosComponent,
    ArticuloComponent,
    ServicioComponent,
    CategoriasComponent,
    ListaProductosComponent,
    AgregarProductosComponent,
    AgregarCategoriasComponent,
    EditarCategoriasComponent,
    EditarProductosComponent,
    PagoExitosoComponent,
    PagoFallidoComponent,
    PagoPendienteComponent,
    PerfilComponent,
    AgregarVehiculoComponent,
    ReservaComponent,

    TurnosComponent,
    AgregarReservasComponent,
    PanelAdminComponent,
    ListaServiciosComponent,
    ListaUsuariosComponent,
    EditarVehiculoComponent,
    
    AgregarSucursalesComponent,
 


  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent, ServiciosComponent, QuienesSomosComponent, IntegranteComponent,
    SucursalesComponent, ContactoComponent, RegistrarseComponent, LoginComponent,
    CarritoComponent, ServicioComponent, CategoriasComponent,
    ListaProductosComponent,
    AgregarCategoriasComponent, AgregarProductosComponent, EditarCategoriasComponent

  ]

})
export class PagesModule { }
