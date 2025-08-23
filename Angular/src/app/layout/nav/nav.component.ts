import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, OnDestroy {
  isLogged:boolean= false;
  isAdmin: boolean = false;
  //agregamos el userName para mostrar en la sesión de usuario:
  userName: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin; // 🔹 Actualizar la variable local
      
    });
    // Suscribirse a cambios de sesión y nombre de usuario
    this.subscriptions.add(
      this.authService.userName$.subscribe(name => this.userName = name) // Escuchar cambios en el nombre
    );

    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(resp => this.isLogged = resp)
    );
    
    
    
    
  }

  logout(): void{
    this.authService.logout();
    this.tokenService.removeToken()
    //window.location.reload()   //evitar recargar la página.
    this.router.navigate(['/']);
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();  // Evita fugas de memoria
  }

  
}
