import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/models/categoria';


@Component({
  selector: 'app-agregar-categorias',
  templateUrl: './agregar-categorias.component.html',
  styleUrls: ['./agregar-categorias.component.css']
})
export class AgregarCategoriasComponent {

  nombre: string = "";

  constructor(private categoriaServicio: CategoriaService, private router: Router){

  }

  ngOnInit(): void { }

  create(): void{
    // const categoria = new Categoria(this.nombre);
    const categoria = new FormData();
    categoria.append('nombre',this.nombre)
    this.categoriaServicio.create(categoria).subscribe(
      data=>this.router.navigate(['/categorias'])
    );
    console.log(categoria);
  }
}
