export class Venta {
  id?: number;
  numero_factura?: number;
  total?: number;
  tipo_pago?: 'efectivo' | 'tarjeta' | 'transferencia';
  estado?: 'pendiente' | 'completada' | 'cancelada';
  fecha_pago?: string;
  cliente?: number; 
}
