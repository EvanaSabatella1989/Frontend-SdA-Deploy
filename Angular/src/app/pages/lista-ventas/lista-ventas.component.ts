import { Component } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/service/venta.service';
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


  constructor(private ventaService: VentaService) { }

  ngOnInit(): void {
    this.listarVentas();



  }

  listarVentas() {
    this.ventaService.getVentas().subscribe({
      next: (resp) => {
        this.ventas = resp;
        console.log('Ventas:', resp); 
      },
      error: (err) => console.error('Error al cargar ventas', err)
    });
  }

  



}
