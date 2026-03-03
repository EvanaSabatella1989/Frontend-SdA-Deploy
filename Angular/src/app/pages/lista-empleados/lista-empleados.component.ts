import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
declare var bootstrap: any;
import { FormsModule } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { UsuarioService } from 'src/app/service/usuario.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  //lista de empleados 
  empleados: Empleado[] = [];
  //empleado actual si es null se crea 
  empleadoActual: any | null = null;
  //campos del form
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  // cargo: string = '';

// opciones disponibles
  cargo: string[] = ['lavanderia', 'gomeria', 'electricidad', 'chapa_pintura'];
// cargo seleccionado
  cargoSeleccionada?: string;
  showPassword: boolean = false;

  constructor(private authService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  //Obtener empleados
  cargarEmpleados() {
    this.authService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  //abrir modal crear o editar
  abrirModal(empleado?: any) {

    if (empleado) {
      //form editar
      this.empleadoActual = empleado;
      this.email = empleado.email;
      this.first_name = empleado.first_name;
      this.last_name = empleado.last_name;
      this.cargoSeleccionada = empleado.cargo;
      this.password = ''; //por ahora no se puede
    } else {
      // form crear
      this.empleadoActual = null;
      this.email = '';
      this.first_name = '';
      this.last_name = '';
      this.password = '';
      this.cargoSeleccionada = undefined;
    }

    const modal = new bootstrap.Modal(
      document.getElementById('modalEmpleado')!
    );
    modal.show();
  }

  //guardar 
  guardarEmpleado() {

    if (this.empleadoActual) {

      this.authService.editarEmpleado(
        this.empleadoActual.id,
        {
          cargo: this.cargoSeleccionada,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
        }
      ).subscribe({
        next: () => {
          alert('Empleado actualizado correctamente ☑️');
          this.cargarEmpleados();
          this.cerrarModal();
        },
        error: (err) => {
          console.log(err);
          alert('Error al actualizar empleado ❌');
        }
      });

      return;
    }

    //crear

    if (!this.email || !this.password || !this.cargoSeleccionada) {
      alert('Todos los campos son obligatorios ❌');
      return;
    }

    this.authService.crearEmpleado({
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      cargo: this.cargoSeleccionada
    }).subscribe({
      next: () => {
        alert('Empleado creado correctamente ☑️');
        this.cargarEmpleados();
        this.cerrarModal();
      },
      error: (err) => {
        console.log(err);
        alert('Error al crear empleado ❌');
      }
    });
  }

  //eliminar
  eliminarEmpleado(id: number) {

    if (!confirm('¿Deseas eliminar este empleado?')) return;

    this.authService.deleteEmpleado(id).subscribe(() => {
      alert('Empleado eliminado ☑️');
      this.cargarEmpleados();
    });
  }

  cerrarModal() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('modalEmpleado')!
    );
    modal?.hide();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}


