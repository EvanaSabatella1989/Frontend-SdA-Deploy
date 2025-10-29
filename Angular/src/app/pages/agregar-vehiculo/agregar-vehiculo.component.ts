import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/service/vehiculo.service';
import { CategoriaService } from 'src/app/service/categoria.service'; // servicio para traer categorias
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {
  vehiculoForm: FormGroup;
  categorias: any[] = []; // categorias traidas desde backend
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
  }

  constructor(
    private fb: FormBuilder, 
    private vehiculoService: VehiculoService, 
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      anio_fabricacion: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  ngOnInit() {
    // Traer categorías tipo 'servicio' desde backend
    this.categoriaService.obtenerCategorias('servicio').subscribe({
      next: (resp) => {
        this.categorias = resp as any[]; // ✅ TypeScript ahora sabe que es array
      },
      error: (err) => console.error(err)
    });

    // Actualizar marcas y tipos al cambiar la categoría
    this.vehiculoForm.get('categoria')?.valueChanges.subscribe(categoria => {
      this.marcasDisponibles = this.marcasPorCategoria[categoria?.nombre] || [];
      this.tiposDisponibles = this.tiposPorCategoria[categoria?.nombre] || [];
      this.vehiculoForm.get('marca')?.setValue('');
      this.vehiculoForm.get('tipo')?.setValue('');
    });
  }

  agregarVehiculo() {
  if (this.vehiculoForm.valid) {
    // Solo enviar el ID de la categoría
    const vehiculoData = { ...this.vehiculoForm.value };
    vehiculoData.categoria = this.vehiculoForm.value.categoria.id;

    this.vehiculoService.agregarVehiculo(vehiculoData).subscribe({
      next: () => {
        alert('Vehículo agregado exitosamente');
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        alert('Error al agregar el vehículo');
        console.error(error);
      }
    });
  } else {
    alert('Por favor, complete todos los campos.');
  }
}
}
