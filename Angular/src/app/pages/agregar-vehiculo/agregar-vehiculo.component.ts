import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/service/vehiculo.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent {
  vehiculoForm: FormGroup;
  marcasDisponibles: string[] = [];
  tiposDisponibles: string[] = [];

  // Diccionario con las marcas según la categoría
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
    Auto: ['Sedán', 'Hatchback', 'SUV (Sport Utility Vehicle)', 'Pickup', 'Deportivo'],
    Camión: ['Camión rígido', 'Camión articulado', 'Camión con acoplado', 'Camión de doble cabina'],
    Ómnibus: ['De un solo piso', 'De doble piso', 'Articulado', 'Biarticulado', 'Midibús', 'Minibús'],
    Furgón: ['De carga', 'Refrigerado', 'De pasajeros', 'Blindado', 'Camperizado'],
    Otro: ['Otro']
  }

  constructor(private fb: FormBuilder, private vehiculoService: VehiculoService) {
    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      anio_fabricacion: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  ngOnInit() {
    // Detecta cambios en el campo de categoría y actualiza las marcas disponibles
    this.vehiculoForm.get('categoria')?.valueChanges.subscribe(categoria => {
      this.marcasDisponibles = this.marcasPorCategoria[categoria] || [];
      this.tiposDisponibles = this.tiposPorCategoria[categoria] || [];
      this.vehiculoForm.get('marca')?.setValue(''); // Reinicia el campo de marca al cambiar de categoría
      this.vehiculoForm.get('tipo')?.setValue('');
    });
  }

  agregarVehiculo() {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.agregarVehiculo(this.vehiculoForm.value).subscribe({
        next: () => {
          alert('Vehículo agregado exitosamente');
          this.vehiculoForm.reset();
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
