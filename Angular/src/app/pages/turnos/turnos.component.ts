import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from 'src/app/models/sucursal';
import { Turno } from 'src/app/models/turno';
import { ServicioService } from 'src/app/service/servicio.service';
import { TokenService } from 'src/app/service/token.service';
declare var bootstrap: any;

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  turnos: Turno[] = [];
  sucursales: Sucursal[] = [];
  formTurno!: FormGroup;
  turnoActual: Turno | null = null;
  modalInstance: any;
  isAdmin: boolean = false;


  constructor(
    private turnoService: ServicioService,
    private sucursalService: ServicioService,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void{
    this.isAdmin=this.tokenService.isAdmin();
    if(!this.isAdmin)
      return;
 

  this.cargarTurnos();
  this.cargarSucursales();

  // inicializamos el formulario
  this.formTurno=this.fb.group({
   sucursal: ['null', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    disponible: [true]
  });
}

  cargarTurnos() {
    this.turnoService.getTurnos().subscribe(data => this.turnos = data);
  }

  cargarSucursales() {
    this.sucursalService.obtenerSucursales().subscribe(data => this.sucursales = data);
  }

  abrirModal(turno?: Turno) {
    this.turnoActual = turno || null;
    if (turno) {
      this.formTurno.patchValue({
        sucursal: turno.sucursal?.id || null,
        fecha: turno.fecha,
        hora: turno.hora,
        disponible: turno.disponible
      });
      
  }else{
    this.formTurno.reset({ disponible: true, sucursal: null });
  }
  const modalEl = document.getElementById('modalTurno');
  this.modalInstance = new bootstrap.Modal(modalEl);
  this.modalInstance.show();
}

  guardarTurno() {
    // Creamos un objeto nuevo con sucursal_id para Django
  const datos = {
    ...this.formTurno.value,
    sucursal_id: this.formTurno.value.sucursal
  };
  delete datos.sucursal; // eliminamos el campo duplicado

    if (this.turnoActual?.id) {
      this.turnoService.updateTurno(this.turnoActual.id, datos).subscribe(() => {
        this.cargarTurnos();
        this.modalInstance.hide();
      });
    } else {
      this.turnoService.createTurno(datos).subscribe(() => {
        this.cargarTurnos();
        this.modalInstance.hide();
      });
    }
  }

  eliminarTurno(id?: number) {
    if (id && confirm('¿Desea eliminar este turno?')) {
      this.turnoService.deleteTurno(id).subscribe(() => this.cargarTurnos());
    }
  }



 }
