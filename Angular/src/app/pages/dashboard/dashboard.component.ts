import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //para cargar los servicios dinamicamente
  servicios: any[] = [];
  productos: any[] = [];
  chunkedServicios: any[][] = [];
  chunkedProductos: any[][] = [];

  marcasVehiculos: any[] = [];
  chunkedMarcasVehiculos: any[][] = [];
  marcasPublicidad: any[] = [];
  chunkedMarcasPublicidad: any[][] = [];

  constructor(private servicioService: ServicioService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarProductos();
    this.cargarMarcas();
  }

  cargarServicios(): void {
  this.servicioService.obtenerServicios().subscribe({
    next: (todosServicios) => {
      this.servicios = todosServicios;
      this.chunkedServicios = this.chunkArray(this.servicios, 3);
    },
    error: (errorData) => {
      console.error('error al cargar los servicios', errorData);
    }
  });
}

  cargarProductos(): void {
    this.productoService.traerProductos().subscribe({
      next: (todosProductos) => {
        this.productos = todosProductos;
        this.chunkedProductos = this.chunkArray(this.productos, 3);
      },
      error: (errorData) => {
        console.error('error al cargar los productos', errorData)
      }
    })
  }

  cargarMarcas(): void {
  this.marcasVehiculos = [
    { nombre: 'Peugeot', imagen: '../assets/marcas/peu.jpeg' },
    { nombre: 'Fiat', imagen: 'assets/marcas/fiat.jpeg' },
    { nombre: 'Renault', imagen: 'assets/marcas/renault.jpeg' },
    { nombre: 'Chevrolet', imagen: 'assets/marcas/chevrolet.jpeg' },
    { nombre: 'Scania', imagen: 'assets/marcas/scania.png' },
    { nombre: 'Volvo', imagen: 'assets/marcas/volvo2.jpeg' },
    { nombre: 'Zanella', imagen: 'assets/marcas/zanella.jpeg' },
    { nombre: 'Suzuki', imagen: 'assets/marcas/suzuki.png' },
    { nombre: 'Yamaha', imagen: 'assets/marcas/yamaha.jpeg' },
    { nombre: 'Honda', imagen: 'assets/marcas/honda.jpeg' },
    { nombre: 'Kawasaki', imagen: 'assets/marcas/kawasaki.png' },
    { nombre: 'Benelli', imagen: 'assets/marcas/benelli.jpeg' },
    { nombre: 'Corven', imagen: 'assets/marcas/corven.png' },
    { nombre: 'Motomel', imagen: 'assets/marcas/motomel.png' },
    { nombre: 'Toyota', imagen: 'assets/marcas/toyota.jpeg' },
    { nombre: 'Mercedes', imagen: 'assets/marcas/mercedes.jpeg' },
    { nombre: 'Volswagen', imagen: 'assets/marcas/volswagen.jpeg' },
    { nombre: 'BMW', imagen: 'assets/marcas/bmw.jpeg' },
    { nombre: 'Audi', imagen: 'assets/marcas/audi.jpeg' },
    { nombre: 'Nissan', imagen: 'assets/marcas/nissan.jpeg' },
    { nombre: 'Kia', imagen: 'assets/marcas/kia.png' },
    { nombre: 'Hyundai', imagen: 'assets/marcas/hyundai.png' },
    { nombre: 'Iveco', imagen: 'assets/marcas/iveco.jpeg' },
    { nombre: 'Ford', imagen: 'assets/marcas/ford.png' },
    { nombre: 'Isuzu', imagen: 'assets/marcas/isuzu.png' },
    
    
  ];

  this.marcasPublicidad = [
    { nombre: 'Castrol', imagen: 'assets/marcas/castrol.png' },
    { nombre: 'Yuasa', imagen: 'assets/marcas/yuasa.png' },
    { nombre: 'Mobil', imagen: 'assets/marcas/mobil.png' },
    { nombre: 'Total', imagen: 'assets/marcas/total.png' },
    { nombre: 'Shell', imagen: 'assets/marcas/shell.png' },
    { nombre: 'Pirelli', imagen: 'assets/marcas/pirelli.jpeg' },
    { nombre: 'Bosch', imagen: 'assets/marcas/bosch.png' },
    { nombre: 'NGK', imagen: '../assets/marcas/ngk.jpeg' },
    { nombre: 'Bridgestone', imagen: 'assets/marcas/bridgestone.png' },
    { nombre: 'Gulf', imagen: 'assets/marcas/gulf.png' },
    { nombre: 'Liqui-moli', imagen: 'assets/marcas/liqui.png' },
    { nombre: 'Moura', imagen: 'assets/marcas/moura.png' },
    { nombre: 'Michelin', imagen: 'assets/marcas/michelin.png' },
    { nombre: 'Goodyear', imagen: 'assets/marcas/goodyear.jpeg' },
    { nombre: 'Firestone', imagen: 'assets/marcas/firestone.png' },
    { nombre: 'Manfilter', imagen: 'assets/marcas/manfilter.png' },
    { nombre: 'Petrobras', imagen: 'assets/marcas/petrobras.png' },
    { nombre: 'Valvoline', imagen: 'assets/marcas/valvoline.png' },
    { nombre: 'Stanley', imagen: 'assets/marcas/stanley.png' },
    { nombre: 'Total-energies', imagen: 'assets/marcas/totalenergies.jpeg' },
    
    
    
  ];

  this.chunkedMarcasVehiculos = this.chunkArray(this.marcasVehiculos, 12);
  this.chunkedMarcasPublicidad = this.chunkArray(this.marcasPublicidad, 12);
}

private chunkArray(arr: any[], size: number): any[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
  

}
