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
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AgregarServiciosComponent } from './agregar-servicios/agregar-servicios.component';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { EditarServiciosComponent } from './editar-servicios/editar-servicios.component';
import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './pago-pendiente/pago-pendiente.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { ReservaComponent } from './reserva/reserva.component';




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
    ListaServiciosComponent,
    CategoriasComponent,
    ListaProductosComponent,
    AgregarServiciosComponent,
    AgregarProductosComponent,
    AgregarCategoriasComponent,
    EditarCategoriasComponent,
    EditarServiciosComponent,
    EditarProductosComponent,
    PagoExitosoComponent,
    PagoFallidoComponent,
    PagoPendienteComponent,
    PerfilComponent,
    AgregarVehiculoComponent,
    ReservaComponent,

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
    CarritoComponent, ServicioComponent, ListaServiciosComponent, CategoriasComponent,
    ListaProductosComponent, AgregarServiciosComponent, EditarServiciosComponent,
    AgregarCategoriasComponent, AgregarProductosComponent, EditarCategoriasComponent

  ]

})
export class PagesModule { }
