import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import { RequestStatus } from 'src/app/models/statusrequest';
import { PayService } from 'src/app/service/pay.service';
import { StoreCartService } from 'src/app/service/store-cart.service';
import { ProductoService } from 'src/app/service/producto.service';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  products: Producto[] = [];
  status: RequestStatus = 'init';
  total_precio = 0;
  
  constructor(
    private serviceStore: StoreCartService,
    private payService: PayService,
    private productService: ProductoService,
    private cdr: ChangeDetectorRef
  ){

  }
   ngOnInit(): void {
    this.serviceStore.getCarrito();

    // Escucha cambios del carrito enviados desde otras pestañas
    const channel = new BroadcastChannel('carrito-channel');
    channel.onmessage = (event) => {
      if (event.data === 'carrito_actualizado') {
        console.log("Carrito actualizado desde otra pestaña");
        this.serviceStore.getCarrito(); // 🔥 Trae datos reales del backend
      }
    };

    this.serviceStore.myCart$.subscribe(items => {
      this.cartItems = items;
      this.total_precio = items
        .map(item => item.producto.precio * item.cantidad)
        .reduce((acc, precio) => acc + precio, 0);

         this.cdr.detectChanges(); // 🔥 fuerza el refresco
    });

    //detecta cuando el usuario vuelve a esta pestaña
    // document.addEventListener('visibilitychange', () => {
    //   if (!document.hidden) {
    //     this.revisarCheckout();
    //   }
    // });
  }

  preferenceMP() {
    this.status = 'loading';
    console.log("Productos a enviar:", this.cartItems);

    this.payService.preference(this.cartItems).subscribe({
      next: (resp: { init_point: string }) => {
        console.log("Respuesta de Mercado Pago:", resp);

        if (resp.init_point) {

          // marca que el checkout fue iniciado
          localStorage.setItem('checkoutIniciado', 'true');

          // abre MP en nueva pestaña
          window.open(resp.init_point, '_blank');

          this.status = 'success';

        } else {
          console.error('No se recibió un link de pago');
          this.status = 'failed';
        }
      },
      error: (error: any) => {
        console.error('Error en la solicitud de pago:', error);
        this.status = 'failed';
      }
    });
  }

  //revisa si el checkout estaba iniciado y si sí limpia el carrito
  // revisarCheckout() {
  //   const checkoutIniciado = localStorage.getItem('checkoutIniciado');

  //   if (!checkoutIniciado) return; // si no se inicio pago  no hacer nada

  //   console.log("Volviste desde Mercado Pago. Vaciando carrito...");

  //   this.serviceStore.clearCart();  // vacia el carrito

  //   localStorage.removeItem('checkoutIniciado'); // limpia el flag
  // }

}
  /*
  ngOnInit(): void {
      // this.serviceStore.myCart$.subscribe(products => {
      //   this.products = products
      //   const precio =  products.map(p => p.precio * (p.cantidad ?? 1)).reduce((a, b) => a + b, 0)
      //   this.total_precio = Number(Number.parseFloat(precio.toString()).toFixed(2))
      // })

      this.serviceStore.getCarrito();
  //     this.serviceStore.myCart$.subscribe(products => {
  //     this.products = products;

      
  //     console.log("Items: " + products)
  //     // forkJoin(products.map(p => this.productService.detail(p.producto))).subscribe(results => {
  //     //   console.log(results); 
  //     // });
  //     //agrego lo del precio pero no estoy segura (no se donde se ve el cambio)
  //     const precio =  products.map(p => p.precio * (p.cantidad ?? 1)).reduce((a, b) => a + b, 0)
      
  //     this.total_precio = Number(Number.parseFloat(precio.toString()).toFixed(2))
      
  // });
    //   this.serviceStore.myCart$.subscribe(items => {
    //    this.cartItems = items;
    //    console.log("Productos preparados : " +this.cartItems)
    //    this.total_precio = items
    //      .map(item => item.producto.precio * item.cantidad)
    //       .reduce((acc, precio) => acc + precio, 0);
    //  });
    this.serviceStore.myCart$.subscribe(items => {
  if (!items || items.length === 0) {
    this.cartItems = [];
    this.total_precio = 0;
    console.log("Carrito vacío o sin productos");
    return;
  }

  this.cartItems = items;
  console.log("Productos preparados:", this.cartItems);

  this.total_precio = items
    .map(item => item.producto?.precio * (item.cantidad ?? 1))
    .reduce((acc, precio) => acc + precio, 0);
});
  }

  // preferenceMP(){
  //   this.status = 'loading'
  //   // this.payService.preference(this.products)
  //   console.log("Productos a enviar: " + this.cartItems)
  //   this.payService.preference(this.cartItems)
  //   .subscribe({
  //     next: (resp) => {
  //       console.log("resp: " + resp)
  //       //window.location.replace(resp.init_point)
  //       window.open(resp.init_point, '_blank');
  //     },
  //     error: (error) => {
  //       this.status = 'failed'
  //       console.log(error)
  //     }
  //   })
  // }

  preferenceMP() {
    this.status = 'loading';
    console.log("Productos a enviar:", this.cartItems);

    this.payService.preference(this.cartItems).subscribe({
      next: (resp: { init_point: string }) => {  // ✅ Tipado correcto
        console.log("Respuesta de Mercado Pago:", resp);

        if (resp.init_point) {
          window.open(resp.init_point, '_blank');  // ✅ Abre en nueva pestaña
          // window.open(resp.init_point); 
          
          // const token = localStorage.getItem('token');
          // sessionStorage.setItem('token', token || ''); // refuerzo

          // window.location.replace(`${resp.init_point}?jwt=${token}`);
          
          // window.location.replace(resp.init_point)
          this.status = 'success';
         
        } else {
          console.error('No se recibió un link de pago');
          this.status = 'failed';
        }
      },
      error: (error: any) => {
        console.error('Error en la solicitud de pago:', error);
        this.status = 'failed';
      }
    });
  }

}*/
