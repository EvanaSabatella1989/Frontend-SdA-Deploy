import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/service/vehiculo.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  vehiculoForm!: FormGroup;
  vehiculoId!: number;
  categorias: any[] = []; // aquí guardamos las categorías de servicios

  marcasDisponibles: string[] = [];
  tiposDisponibles: string[] = [];

  marcasPorCategoria: { [key: string]: string[] } = {
    Moto: ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Benelli', 'Zanella', 'Corven', 'Motomel','Mondial', 'Otra'],
    Auto: ['Toyota', 'Ford', 'Volkswagen', 'Chevrolet', 'Renault', 'Fiat', 'Peugeot', 'Honda', 'BMW', 'Mercedes Benz', 'Audi', 'Nissan', 'Kia', 'Hyundai', 'Otra'],
    Camión: ['Scania', 'Volvo', 'Mercedes-Benz', 'Iveco', 'Volkswagen', 'Ford', 'Isuzu', 'Otro'],
    Ómnibus: ['Scania', 'Mercedes-Benz', 'Iveco', 'Volkswagen', 'Marcopolo', 'Volvo', 'Otro' ],
    Furgón: ['Renault', 'Mercedes-Benz', 'Iveco', 'Volkswagen', 'Fiat', 'Ford', 'Peugeot', 'Citroen', 'Nissan', 'Toyota', 'Otro' ],
    Otro: ['Otro']
  };

  tiposPorCategoria: { [key: string]: string[]} = {
    Moto: ['Deportiva', 'Naked', 'Custom/Chopper', 'Scooter', 'Enduro'],
    Auto: ['Sedán', 'Hatchback', 'SUV', 'Pickup', 'Deportivo'],
    Camión: ['Camión rígido', 'Camión articulado', 'Camión con acoplado', 'Camión de doble cabina'],
    Ómnibus: ['De un solo piso', 'De doble piso', 'Articulado', 'Biarticulado', 'Midibús', 'Minibús'],
    Furgón: ['De carga', 'Refrigerado', 'De pasajeros', 'Blindado', 'Camperizado'],
    Otro: ['Otro']
  };

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
    this.vehiculoId = Number(this.route.snapshot.paramMap.get('id'));

    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      anio_fabricacion: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });

    this.categoriaService.obtenerCategorias('servicio').subscribe(
      (res: any) => {
        this.categorias = Array.isArray(res) ? res : (res.results || res.data || res.items || res.categorias || []);
        
        // traer vehículo después de tener categorías
        this.vehiculoService.getVehiculo(this.vehiculoId).subscribe((data: any) => {
          const categoriaId = data.categoria ? String(data.categoria) : '';

          // ⚡ Encontramos la categoría seleccionada
          const categoriaObj = this.categorias.find(c => String(c.id) === categoriaId);

          // Actualizamos las opciones de marca/tipo según la categoría inicial
          if (categoriaObj) {
            this.marcasDisponibles = this.marcasPorCategoria[categoriaObj.nombre] || [];
            this.tiposDisponibles = this.tiposPorCategoria[categoriaObj.nombre] || [];
          }

          this.vehiculoForm.patchValue({
            marca: data.marca ?? '',
            modelo: data.modelo ?? '',
            categoria: categoriaId,
            tipo: data.tipo ?? '',
            anio_fabricacion: data.anio_fabricacion ?? ''
          });
        });
      }
    );

    // Suscribirse al cambio de categoría en el form
    this.vehiculoForm.get('categoria')?.valueChanges.subscribe((catId: string) => {
      const categoriaObj = this.categorias.find(c => String(c.id) === catId);
      if (categoriaObj) {
        this.marcasDisponibles = this.marcasPorCategoria[categoriaObj.nombre] || [];
        this.tiposDisponibles = this.tiposPorCategoria[categoriaObj.nombre] || [];
      } else {
        this.marcasDisponibles = [];
        this.tiposDisponibles = [];
      }
      this.vehiculoForm.get('marca')?.setValue('');
      this.vehiculoForm.get('tipo')?.setValue('');
    });
  }

onSubmit(): void {
  if (this.vehiculoForm.valid) {
    // ✅ Si no se modificó nada, volver directo al perfil
    if (this.vehiculoForm.pristine) {
      this.router.navigate(['/perfil']);
      return;
    }

    // ✅ Construir payload asegurando que categoria sea number
    const payload = {
      ...this.vehiculoForm.value,
      categoria: Number(this.vehiculoForm.value.categoria)
    };

    this.vehiculoService.editarVehiculo(this.vehiculoId, payload).subscribe({
      next: () => {
        alert('Vehículo actualizado correctamente');
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.error('Error al actualizar vehículo', err);
        alert('Error al actualizar el vehículo');
      }
    });
  }
}

}
