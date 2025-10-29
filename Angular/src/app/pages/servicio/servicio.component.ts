import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  // Formularios reactivos y variables
  servicioForm!: FormGroup;
  servicio: any = {}; 
 

  constructor(
    private miservicio: ServicioService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { 
    
  }

  ngOnInit(): void {
    this.cargarServicio();
    this.servicioForm.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  
  }

  // cargar detalles del servicio seleccionado
  cargarServicio() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.miservicio.obtenerServicio(id).subscribe(
      data => {
        this.servicio = data;
        // Rellenar el formulario con el nombre y ID del servicio
        this.servicioForm.patchValue({
          servicio: this.servicio.nombre,
          servicioId: this.servicio.id
        });
      },
      err => {
        alert('Error al cargar el servicio');
        this.router.navigate(['']);
      }
    );
  }
}


 