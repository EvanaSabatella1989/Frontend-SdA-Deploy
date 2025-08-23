import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import { CarritoItem } from 'src/app/service/store-cart.service'
import { StoreCartService } from 'src/app/service/store-cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() product: Producto = {
    id: 0,
    nombre: '',
    imagen: '',
    precio: 0,
    categoria: '',
    descripcion: ''
  }

  @Input() cantidad: number = 1;

  quality = 1
  precio = 0
  constructor(
    private storeService: StoreCartService
  ){}

  ngOnInit(): void {
      // this.quality = this.product.cantidad ?? 1;
      this.quality = this.cantidad
      const precioQuality = (this.product.precio * this.quality ).toString()
      this.precio = Number(Number.parseFloat(precioQuality).toFixed(2))
      console.log("Nombre del producto: " + this.product.nombre)
      console.log("Imagen: " + this.product.imagen)
  }

  // deleteOfCart() {
  //   this.storeService.deleteProduct(this.product.id)
  // }

  deleteOfCart() {
    this.storeService.removeProduct(this.product.id)
  }

  addQuality(e: Event) {
    e.preventDefault()
    this.quality += 1
    this.storeService.updateQuantity(this.product.id, this.quality)
  }
  subtractQuality(e: Event) {
    e.preventDefault()
    if(this.quality === 1) return
    this.quality -= 1
    this.storeService.updateQuantity(this.product.id, this.quality)
  }
}
