import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/models/servicio';
import { Sucursal } from 'src/app/models/sucursal';
import { ServicioService } from 'src/app/service/servicio.service';
declare var bootstrap: any;

@Component({
  selector: 'app-agregar-sucursales',
  templateUrl: './agregar-sucursales.component.html',
  styleUrls: ['./agregar-sucursales.component.css']
})
export class AgregarSucursalesComponent {
  sucursales: Sucursal[] = [];
  form!: FormGroup;
  sucursalSeleccionada?: Sucursal;
  modalInstance: any;
  servicios: Servicio[] = [];
  isAdmin: boolean = false;

  constructor(private sucursalService: ServicioService, private fb: FormBuilder, private servicioService: ServicioService) {
    this.form = this.fb.group({
      nombre: [''],
      direccion: [''],
      telefono: [''],
      servicios: [[]]
    });
  }

  ngOnInit(): void {
    this.cargarSucursales();
    this.cargarServicios();

  }

  cargarServicios() {
    this.servicioService.obtenerServicios().subscribe(data => {
      this.servicios = data;
    });
  }

  cargarSucursales() {
    this.sucursalService.getSucursales().subscribe(data => {
      console.log('Sucursales recibidas del backend:', data);
      this.sucursales = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar esta sucursal?')) {
      this.sucursalService.deleteSucursal(id).subscribe(() => {
        this.cargarSucursales();
      });
    }
  }

  abrirModal(sucursal?: Sucursal) {
    this.sucursalSeleccionada = sucursal;

    const modalEl = document.getElementById('sucursalModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
    }

    if (sucursal) {
      // this.form.patchValue(sucursal);
      this.form.patchValue({
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        telefono: sucursal.telefono,
        servicios: sucursal.servicios?.map(s => s.id)
      });
    } else {
      this.form.reset();
      this.form.get('servicios')?.setValue([]);
    }
    this.modalInstance.show();
  }

  guardar() {
    const sucursal: Sucursal = this.form.value;

    if (this.sucursalSeleccionada?.id) {
      this.sucursalService.updateSucursal(this.sucursalSeleccionada.id, sucursal).subscribe(() => {
        this.cargarSucursales();
        this.modalInstance?.hide();
      });
    } else {
      this.sucursalService.createSucursal(sucursal).subscribe(() => {
        this.cargarSucursales();
        this.modalInstance?.hide();
      });
    }
  }

  onCheckboxChange(event: any) {
  const servicios: number[] = this.form.get('servicios')?.value || [];
  const valor = Number(event.target.value);

  if (event.target.checked) {
    if (!servicios.includes(valor)) {
      servicios.push(valor);
    }
  } else {
    const index = servicios.indexOf(valor);
    if (index > -1) {
      servicios.splice(index, 1);
    }
  }

  this.form.get('servicios')?.setValue(servicios);
}

}
