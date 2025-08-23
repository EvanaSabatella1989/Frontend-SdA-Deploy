import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Sucursal } from '../../models/sucursal';
import { ServicioService } from 'src/app/service/servicio.service';



@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  // sucursales: Sucursal[] = []; 
  sucursales: any[] = [];
  

  constructor(private sucursaleService: ServicioService,private sanitizer: DomSanitizer) { }

  ngOnInit():void {
   
    this.sucursaleService.obtenerSucursales().subscribe({
      
      next: (data) => {
        console.log("Sucursales cargadas:", data); 
        this.sucursales = data.map((sucursal: any) => ({
          
          ...sucursal,
          mapaUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-21VT6zvCtJf3APaullfkjevyUqIoNAk&q=${sucursal.latitud},${sucursal.longitud}&zoom=15`
          )
          
        }));
        console.log("Sucursales cargadas:", data);
      },
      error: (err) => {
        console.error("Error al obtener las sucursales:", err);
      }
    });
  }
  }






