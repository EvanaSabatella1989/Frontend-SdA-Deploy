import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/service/servicio.service';
import { ProductoService } from 'src/app/service/producto.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  
  serviciosRandom: any[] = [];
  categoriasRandom: any[] = [];
  sucursalesRandom: any[] = [];

  constructor(
    private servicioService: ServicioService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarServiciosRandom();
    this.cargarCategoriasRandom();
    this.cargarSucursalesRandom();
  }

  private getRandomItems(array: any[], cantidad: number): any[] {
    return [...array]
      .sort(() => Math.random() - 0.5)
      .slice(0, cantidad);
  }

  cargarServiciosRandom(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (servicios) => {
        this.serviciosRandom = this.getRandomItems(servicios, 2);
      },
      error: (err) => console.error('Error cargando servicios', err)
    });
  }

  cargarSucursalesRandom(): void {
    this.servicioService.obtenerSucursales().subscribe({
      next: (sucursales) => {
        this.sucursalesRandom = this.getRandomItems(sucursales, 4);
      },
      error: (err) => console.error('Error cargando sucursales', err)
    });
  }

  cargarCategoriasRandom(): void {
  // 1. Traemos productos
  this.productoService.traerProductos().subscribe({
    next: (productos: any[]) => {

      // 2. Traemos TODAS las categorías
      this.productoService.traerCategorias().subscribe({
        next: (categorias: any[]) => {

          // 3. Mapa id -> nombre
          const categoriasMap = new Map<number, string>(
            categorias.map(c => [c.id, c.nombre])
          );

          // 4. IDs de categorías usados en productos
          const categoriasUsadas = [
            ...new Set(productos.map(p => p.categoria))
          ];

          // 5. Nombres reales
          const nombresCategorias = categoriasUsadas
            .map(id => categoriasMap.get(id))
            .filter(Boolean);

          // 6. Elegimos 2 random
          this.categoriasRandom = this.getRandomItems(nombresCategorias, 2);
        }
      });

    },
    error: err => console.error(err)
  });
}


  

  

}
