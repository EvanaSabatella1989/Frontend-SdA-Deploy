import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { UsuarioService } from 'src/app/service/usuario.service'
import { VehiculoService } from 'src/app/service/vehiculo.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  //  FORMULARIO MODAL
  vehiculoForm: FormGroup;
  categorias: any[] = [];
  marcasDisponibles: string[] = [];
  tiposDisponibles: string[] = [];
  modoEdicion: boolean = false;
  vehiculoEditandoId: number | null = null;

  marcasPorCategoria: { [key: string]: string[] } = {
    Moto: ['Honda','Yamaha','Kawasaki','Suzuki','Benelli','Zanella','Corven','Motomel','Mondial','Otra'],
    Auto: ['Toyota','Ford','Volkswagen','Chevrolet','Renault','Fiat','Peugeot','Honda','BMW','Mercedes Benz','Audi','Nissan','Kia','Hyundai','Otra'],
    Camión: ['Scania','Volvo','Mercedes-Benz','Iveco','Volkswagen','Ford','Isuzu','Otro'],
    Ómnibus: ['Scania','Mercedes-Benz','Iveco','Volkswagen','Marcopolo','Volvo','Otro'],
    Furgón: ['Renault','Mercedes-Benz','Iveco','Volkswagen','Fiat','Ford','Peugeot','Citroen','Nissan','Toyota','Otro'],
    Otro: ['Otro']
  };

  tiposPorCategoria: { [key: string]: string[]} = {
    Moto: ['Deportiva','Naked','Custom/Chopper','Scooter','Enduro'],
    Auto: ['Sedán','Hatchback','SUV','Pickup','Deportivo'],
    Camión: ['Camión rígido','Camión articulado','Camión con acoplado','Camión de doble cabina'],
    Ómnibus: ['De un solo piso','De doble piso','Articulado','Biarticulado','Midibús','Minibús'],
    Furgón: ['De carga','Refrigerado','De pasajeros','Blindado','Camperizado'],
    Otro: ['Otro']
  };

  iconosCategorias: { [key: string]: string } = {
  'Moto': 'fa-motorcycle',
  'Auto': 'fa-car-side',
  'Camión': 'fa-truck-moving',
  'Ómnibus': 'fa-bus',
  'Furgón': 'fa-van-shuttle',
  'Otro': 'fa-question'
};


  constructor(
  private fb: FormBuilder,
  private vehiculoService: VehiculoService,
  private usuarioService: UsuarioService, 
  private authService: AuthService,  
  private router: Router,                
  private servicioService: ServicioService, 
  private categoriaService: CategoriaService ) {

    //  Inicialización del formulario
    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      anio_fabricacion: ['', [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear())
      ]]
    });
  }

  ngOnInit(): void {

  this.usuarioService.obtenerPerfil().subscribe(data => {

    this.usuario = data;
    this.vehiculos = data.vehiculos || [];
    this.carrito = data.carrito ? data.carrito.items : [];

    this.reservas = (data.reservas || []).filter(
      (reserva: any) => reserva.estado !== 'reprogramada'
    );

    
    this.categoriaService.obtenerCategorias('servicio').subscribe({
      next: (resp) => {
        this.categorias = resp;
        this.mapearVehiculos();  
      },
      error: (err) => console.error(err)
    });

  });

  this.authService.isAdmin$.subscribe(isAdmin => {
    this.isAdmin = isAdmin;
  });

  //  Escuchar cambios en categoría
    this.vehiculoForm.get('categoria')?.valueChanges.subscribe(categoria => {

  this.marcasDisponibles = this.marcasPorCategoria[categoria?.nombre] || [];
  this.tiposDisponibles = this.tiposPorCategoria[categoria?.nombre] || [];

  const marcaControl = this.vehiculoForm.get('marca');
  const tipoControl = this.vehiculoForm.get('tipo');

  if (this.marcasDisponibles.length === 0) {
    marcaControl?.disable();
  } else {
    marcaControl?.enable();
  }

  if (this.tiposDisponibles.length === 0) {
    tipoControl?.disable();
  } else {
    tipoControl?.enable();
  }

  marcaControl?.setValue('');
  tipoControl?.setValue('');
});

}

  mapearVehiculos() {
  this.vehiculos = this.vehiculos.map((v: any) => {

    const categoriaEncontrada = this.categorias.find(
      c => Number(c.id) === Number(v.categoria)
    );

    return {
      ...v,
      categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría'
    };
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

confirmarReprogramar(reserva: any) {
  const ok = confirm('¿Seguro que querés reprogramar? Tu turno actual se liberará.');
  if (!ok) return;
  this.reprogramarReserva(reserva);
}

//   agregarVehiculo() {
//   if (this.vehiculoForm.valid) {
//     // Solo enviar el ID de la categoría
//     const vehiculoData = { ...this.vehiculoForm.value };
//     vehiculoData.categoria = this.vehiculoForm.value.categoria.id;

//     this.vehiculoService.agregarVehiculo(vehiculoData).subscribe({
//         next: () => {
//           alert('✅ Vehículo agregado');
//           this.mapearVehiculos();
//           this.vehiculoForm.close();
//         },
//         error: (error) => {
//           console.error(error);
//           alert('❌ Error al agregar el vehículo.');
//         }
//       });
//   } else {
//     alert('Por favor, complete todos los campos.');
//   }
// }

mostrarModal = false;

// abrirModal() {
//   this.mostrarModal = true;
//   document.body.style.overflow = 'hidden'; 
// }

abrirModal(vehiculo?: any) {

  this.mostrarModal = true;
  document.body.style.overflow = 'hidden';

  if (vehiculo) {
    // MODO EDICIÓN
    this.modoEdicion = true;
    this.vehiculoEditandoId = vehiculo.id;

    const categoriaObj = this.categorias.find(
      c => c.nombre === vehiculo.categoriaNombre
    );

    // this.vehiculoForm.patchValue({
    //   marca: vehiculo.marca,
    //   modelo: vehiculo.modelo,
    //   categoria: categoriaObj,
    //   tipo: vehiculo.tipo,
    //   anio_fabricacion: vehiculo.anio_fabricacion
    // });

    //  Primero seteamos la categoría
    this.vehiculoForm.patchValue({
      categoria: categoriaObj
    });

    //  Forzamos a que se carguen marcas y tipos
    this.marcasDisponibles =
      this.marcasPorCategoria[categoriaObj?.nombre] || [];

    this.tiposDisponibles =
      this.tiposPorCategoria[categoriaObj?.nombre] || [];

    //  seteamos el resto
    this.vehiculoForm.patchValue({
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      tipo: vehiculo.tipo,
      anio_fabricacion: vehiculo.anio_fabricacion
    });

  } else {
    //  MODO CREAR
    this.modoEdicion = false;
    this.vehiculoEditandoId = null;
    this.vehiculoForm.reset();
  }
}

cerrarModal() {
  this.mostrarModal = false;
  document.body.style.overflow = 'auto'; 
}

// agregarVehiculo() {
//   if (this.vehiculoForm.valid) {

//     const vehiculoData = { ...this.vehiculoForm.value };
//     vehiculoData.categoria = this.vehiculoForm.value.categoria.id;

//     this.vehiculoService.agregarVehiculo(vehiculoData).subscribe({
//       next: () => {

//         alert('✅ Vehículo agregado');

        
//         this.cerrarModal()

//         // 🔥 2️⃣ Resetear formulario
//         this.vehiculoForm.reset();

//         // 🔥 3️⃣ Recargar perfil completo
//         this.usuarioService.obtenerPerfil().subscribe(data => {
//           this.usuario = data;
//           this.vehiculos = data.vehiculos || [];
//           this.mapearVehiculos();
//         });

//       },
//       error: (error) => {
//         console.error(error);
//         alert('❌ Error al agregar el vehículo.');
//       }
//     });

//   } else {
//     alert('Por favor, complete todos los campos.');
//   }
// }

guardarVehiculo() {

  if (this.vehiculoForm.invalid) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const vehiculoData = { ...this.vehiculoForm.value };
  vehiculoData.categoria = this.vehiculoForm.value.categoria.id;

  if (this.modoEdicion && this.vehiculoEditandoId) {

    // EDITAR
    this.vehiculoService.editarVehiculo(
      this.vehiculoEditandoId,
      vehiculoData
    ).subscribe({
      next: () => {
        alert('✅ Vehículo actualizado');
        this.finalizarGuardado();
      },
      error: () => alert('❌ Error al actualizar')
    });

  } else {

    //  CREAR
    this.vehiculoService.agregarVehiculo(vehiculoData).subscribe({
      next: () => {
        alert('✅ Vehículo agregado');
        this.finalizarGuardado();
      },
      error: () => alert('❌ Error al agregar')
    });
  }
}

finalizarGuardado() {
  this.cerrarModal();
  this.vehiculoForm.reset();

  this.usuarioService.obtenerPerfil().subscribe(data => {
    this.usuario = data;
    this.vehiculos = data.vehiculos || [];
    this.mapearVehiculos();
  });
}

}
