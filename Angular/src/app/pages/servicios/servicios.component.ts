import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { AuthService } from 'src/app/service/auth.service';

import { ServicioService } from 'src/app/service/servicio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  
  miServi:any;
  isLogged:boolean= false;
  isAdmin: boolean = false;  // verifica si el usuario es admin
 



  constructor(private tokenService: TokenService, private authService: AuthService, private serv: ServicioService, private activatedRouter: ActivatedRoute, private router: Router) {
    
   }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp)
    
    // Verifica si el usuario es admin usando el TokenService
    //this.isAdmin = this.tokenService.isAdmin();
    
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin; // 🔹 Actualizar la variable local
      if (isAdmin) {
        console.log("El usuario es administrador");
      } else {
        console.log("El usuario NO es administrador");
      }
    });

    this.serv.obtenerServicios().subscribe({
      next:(serviciosTodos)=>{
        this.miServi=serviciosTodos;
        console.log(" Exito se cargo los servicios");
      },
      error:(errorData)=> {
        console.log("error del componenete servicio ");
        console.error(errorData);
        this.router.navigate(['']);
      }
    })
  

   


  }
  

}