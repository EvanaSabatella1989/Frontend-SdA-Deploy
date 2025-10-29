import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
declare var bootstrap: any;


@Component({
  selector: 'app-agregar-reservas',
  templateUrl: './agregar-reservas.component.html',
  styleUrls: ['./agregar-reservas.component.css']
})
export class AgregarReservasComponent {

  reservaForm!: FormGroup;
  reservas: any[] = [];
  clientes: any[] = [];
  servicios: any[] = [];
  sucursales: any[] = [];
  turnosDisponibles: any[] = [];
  reservaActual: any = null;
  modalInstance: any;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private servicioService: ServicioService, private authService: AuthService) { }


  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    console.log('isAdmin:', this.isAdmin);

    this.reservaForm = this.fb.group({
      cliente: ['', Validators.required],
      servicio: ['', Validators.required],
      sucursal: ['', Validators.required],
      turno: ['', Validators.required]
    });

    this.servicioService.obtenerSucursales().subscribe(data => this.sucursales = data);
    this.servicioService.getTurnos().subscribe(data => this.turnosDisponibles = data);

    if (this.isAdmin) {
      // cargar reservas y clientes para admin
      this.cargarReservas();
      this.cargarClientes();
      this.cargarServicios();
    }
  }

  cargarReservas(): void {
    this.servicioService.obtenerReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log("Reservas cargadas:", this.reservas);  // 👈 para revisar la respuesta
      },
      error: (err) => {
        console.error("Error cargando reservas:", err);
      }
    });
  }

  cargarClientes() {
    this.authService.obtenerClientes().subscribe(data => {
      console.log('Clientes raw:', data);
      this.clientes = data;
    });
  }

  cargarServicios() {
    this.servicioService.obtenerServicios().subscribe(data => this.servicios = data);
    console.log('servicios raw:', this.servicios);
  }

  cargarSucursales() {
    this.servicioService.obtenerSucursales().subscribe(data => this.sucursales = data);
  }

  alCambiarSucursal() {
    const sucursalId = this.reservaForm.value.sucursal;
    if (!sucursalId) return;
    this.servicioService.obtenerTurnosPorSucursal(sucursalId).subscribe(turnos => this.turnosDisponibles = turnos);
  }

  abrirModal(reserva?: any) {
    this.reservaActual = reserva || null;

    //cargo clientes antes
    if (this.clientes.length === 0) {
      this.cargarClientes();
    }
    const modalEl = document.getElementById('modalReserva');
    this.modalInstance = new bootstrap.Modal(modalEl);

    setTimeout(() => {
      if (reserva) {
        this.reservaForm.patchValue({
          cliente: reserva.cliente.id,
          servicio: reserva.servicio,   
          estado: reserva.estado
        });
      } else {
        this.reservaForm.reset();
      }
      this.modalInstance.show();
    });
  }

  // cargo las reservas y actualizo
  guardarReserva() {
  const datos = this.reservaForm.value;

  if (this.reservaActual?.id) {
    if (confirm('¿Desea actualizar esta reserva?')) {
      this.servicioService.actualizarReserva(this.reservaActual.id, datos).subscribe(() => {
        this.cargarReservas();
        this.modalInstance.hide();
      });
    }
  } else {
    if (confirm('¿Desea crear una nueva reserva?')) {
      this.servicioService.crearReserva(datos).subscribe(() => {
        this.cargarReservas();
        this.modalInstance.hide();
      });
    }
  }
}

  eliminarReserva(id: number) {
    if (confirm('¿Desea eliminar esta reserva?')) {
      this.servicioService.eliminarReserva(id).subscribe(() => this.cargarReservas());
    }
  }

}
  



