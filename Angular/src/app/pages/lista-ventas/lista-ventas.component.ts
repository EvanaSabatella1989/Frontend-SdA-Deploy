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

  constructor(private ventaService: VentaService) { }

  ngOnInit(): void {
    this.listarVentas();

    const modalEl = document.getElementById('modalVenta');
    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', () => {
        this.limpiarFormulario();
      });
    }
  }

  listarVentas() {
    this.ventaService.getVentas().subscribe({
      next: (resp) => this.ventas = resp,
      error: (err) => console.error(err)
    });
  }

  abrirModal(venta?: Venta) {
  if (venta) {
    this.ventaActual = venta;

    this.numero_factura = venta.numero_factura ?? 0;
    this.total = venta.total ?? 0;
    this.tipo_pago = venta.tipo_pago ?? null;
    this.estado = venta.estado ?? null;
    this.cliente = venta.cliente ?? 0;
  } else {
    this.ventaActual = null;
    this.limpiarFormulario();
  }

  const modalEl = document.getElementById('modalVenta');
  this.modalInstance = new bootstrap.Modal(modalEl);
  this.modalInstance.show();
}


  guardarVenta() {
    if (this.formInvalido()) {
      alert('⚠️ Completa todos los campos');
      return;
    }

    const ventaData = {
      numero_factura: this.numero_factura,
      total: this.total,
      tipo_pago: this.tipo_pago,
      estado: this.estado,
      cliente: this.cliente
    };

    if (this.ventaActual?.id) {
      this.ventaService.actualizarVenta(this.ventaActual.id, ventaData).subscribe(() => {
        alert('✅ Venta actualizada');
        this.listarVentas();
        this.modalInstance.hide();
      });
    }
  }

  eliminarVenta(venta: Venta) {
    if (!window.confirm(`Eliminar venta N° ${venta.numero_factura}?`)) return;

    this.ventaService.eliminarVenta(venta.id!).subscribe(() => {
      alert('✅ Venta eliminada');
      this.listarVentas();
    });
  }

  formInvalido(): boolean {
    return !this.numero_factura || !this.total || !this.tipo_pago || !this.estado;
  }

  limpiarFormulario() {
    this.ventaActual = null;
    this.numero_factura = 0;
    this.total = 0;
    this.tipo_pago = null;
    this.estado = null;
    this.cliente = 0;
  }

}
