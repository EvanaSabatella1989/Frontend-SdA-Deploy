import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Sucursal } from '../../models/sucursal';
import { ServicioService } from 'src/app/service/servicio.service';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  // sucursales: Sucursal[] = []; 
  sucursales: any[] = [];
  isAdmin: boolean = false;
  formSucursal!: FormGroup;
  sucursalActual: Sucursal | null = null;
  modalInstance: any;


  constructor(private sucursaleService: ServicioService,private sanitizer: DomSanitizer,
    private authService:AuthService,private tokenService:TokenService, private fb: FormBuilder,private servicioService:ServicioService) { }

  // cargamos las sucursales, verificamos si es admin e inicializamos el form
  ngOnInit():void {
   this.cargarSucursales();
   this.isAdmin = this.tokenService.isAdmin();
   this.formSucursal = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      ciudad: [''],
      provincia: ['']
    });
    
  }
  // cargamos todas las sucursales
    cargarSucursales(): void {
    this.sucursaleService.obtenerSucursales().subscribe({
      next: (data) => {
        this.sucursales = data;
      },
      error: (err) => {
        console.error('Error al cargar sucursales:', err);
      }
    });
  }

  // en caso de editar o crear se abre el modal
    abrirModal(sucursal?: Sucursal) {
  this.sucursalActual = sucursal || null;
  if (sucursal) {
    this.formSucursal.patchValue(sucursal);
  } else {
    this.formSucursal.reset();
  }

  const modalEl = document.getElementById('modalSucursal');
  if (!this.modalInstance) {
    this.modalInstance = new bootstrap.Modal(modalEl);
  }
  this.modalInstance.show();
}

  guardarSucursal() {
    const datos = this.formSucursal.value;

    if (this.sucursalActual?.id) {
      this.servicioService.updateSucursal(this.sucursalActual.id, datos).subscribe(() => {
        this.cargarSucursales();
        this.modalInstance.hide();
      });
    } else {
      this.servicioService.createSucursal(datos).subscribe(() => {
        this.cargarSucursales();
        this.modalInstance.hide();
      });
    }
  }

   eliminarSucursal(id: number) {
    if (confirm('¿Desea eliminar esta sucursal?')) {
      this.servicioService.deleteSucursal(id).subscribe(() => this.cargarSucursales());
    }
  }
}






