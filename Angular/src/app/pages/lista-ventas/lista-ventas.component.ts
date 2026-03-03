import { Component } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/service/venta.service';
import { ViewChild, ElementRef } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})

export class ListaVentasComponent {

  ventas: Venta[] = [];
  ventaActual: Venta | null = null;
  modalInstance: any;
  numero_factura!: number;
  total!: number;
  tipo_pago: any = null;
  estado: any = null;
  cliente!: number;
  ventaSeleccionada: Venta | null = null;
  modalDetalle: any;
  loading = true;
  @ViewChild('tablaScroll') tablaScroll!: ElementRef;
  ventasExpandida = new Set<number>();

  constructor(private ventaService: VentaService) { }

  ngOnInit(): void {
    this.listarVentas();



  }

  listarVentas() {
    this.loading = true;
    this.ventaService.getVentas().subscribe({
      next: (resp) => {
        this.ventas = resp;
        console.log('Ventas:', resp); 
        this.loading = false;
      },
      error: (err) =>{
        console.error('Error al cargar ventas', err);
        this.loading = false;
      } 
      
    });
  }

  toggleVenta(id: number) {

  if (this.ventasExpandida.has(id)) {
    this.ventasExpandida.delete(id);
  } else {
    this.ventasExpandida.add(id);

    // 👇 vuelve suavemente al inicio horizontal
    setTimeout(() => {
      this.tablaScroll.nativeElement.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }, 50);
  }
}

  



}
