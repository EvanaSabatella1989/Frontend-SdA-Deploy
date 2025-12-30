export class Venta {
  id?: number;
  numero_factura?: number;
  total?: number;
  tipo_pago?: 'efectivo' | 'tarjeta' | 'transferencia';
  estado?: 'pendiente' | 'completada' | 'cancelada';
  fecha_pago?: string;
  cliente?: number; 
  cliente_nombre?: string;
  cliente_apellido?: string;
  detalles?: VentaDetalle[];
}

export interface VentaDetalle {
  producto_nombre: string;
  cantidad: number;
  precio: number;
  descuento: number;
}
