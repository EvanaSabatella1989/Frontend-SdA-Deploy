
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})

export class PerfilComponent implements OnInit {
  usuario: any = null;
  vehiculos: any[] = [];
  carrito: any[] = [];
  isAdmin: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(data => {
      this.usuario = data;
      this.vehiculos = data.vehiculos || [];;
      this.carrito = data.carrito ? data.carrito.items : [];  // Acceder a items del carrito

      this.authService.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin; // 🔹 Actualizar la variable local
      });
    });
  }
}
