import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from 'src/app/models/sucursal';
import { Turno } from 'src/app/models/turno';
import { ServicioService } from 'src/app/service/servicio.service';
// import { TokenService } from 'src/app/service/token.service';
import { AuthService } from 'src/app/service/auth.service';
declare var bootstrap: any;
import { forkJoin } from 'rxjs';

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
  modalGenerarInstance: any;
  formGenerar!: FormGroup;
  turnosSeleccionados: Set<number> = new Set();
  verTodos: boolean = false;


  constructor(
    private turnoService: ServicioService,
    private sucursalService: ServicioService,
    private fb: FormBuilder,
    // private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.isAdmin=this.tokenService.isAdmin();
    this.isAdmin = this.authService.getIsAdmin();
    if (!this.isAdmin)
      return;


    this.cargarTurnos();
    this.cargarSucursales();

    // inicializamos el formulario
    this.formTurno = this.fb.group({
      sucursal: ['null', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      disponible: [true]
    });

    this.formGenerar = this.fb.group({
      sucursal_id: [null, Validators.required],
      fecha: ['', Validators.required]
    });
  }

  cargarTurnos() {
    // this.turnoService.getTurnos().subscribe(data => this.turnos = data);
 this.turnoService.getTurnos(this.verTodos).subscribe(data => {
    this.turnos = data;
  });
  }

  toggleVerTodos() {
    this.verTodos = !this.verTodos;
    this.cargarTurnos();
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

    } else {
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

  abrirModalGenerar() {
    this.formGenerar.reset();
    const modalEl = document.getElementById('modalGenerar');
    this.modalGenerarInstance = new bootstrap.Modal(modalEl);
    this.modalGenerarInstance.show();
  }

  generarTurnos() {
    if (this.formGenerar.invalid) return;

    this.turnoService.generarTurnos(this.formGenerar.value).subscribe({
      next: (res) => {
        alert(res.detail);
        this.cargarTurnos();
        this.modalGenerarInstance.hide();
      },
      error: (err) => alert('Error: ' + err.error?.detail)
    });
  }

  // opccion de que pueda eliminar por grupo
  toggleSeleccion(id: number) {
    if (this.turnosSeleccionados.has(id)) {
      this.turnosSeleccionados.delete(id);
    } else {
      this.turnosSeleccionados.add(id);
    }
  }

  seleccionarTodos() {
    if (this.turnosSeleccionados.size === this.turnos.length) {
      this.turnosSeleccionados.clear();
    } else {
      this.turnos.forEach(t => this.turnosSeleccionados.add(t.id!));
    }
  }

  eliminarSeleccionados() {
    if (this.turnosSeleccionados.size === 0) return;

    if (!confirm(`¿Eliminar ${this.turnosSeleccionados.size} turnos?`)) return;

    const ids = Array.from(this.turnosSeleccionados);
    const peticiones = ids.map(id => this.turnoService.deleteTurno(id));

    forkJoin(peticiones).subscribe({
      next: () => {
        this.turnosSeleccionados.clear();
        this.cargarTurnos();
      },
      error: (err) => console.error(err)
    });
  }

}
