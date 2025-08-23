import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit{
  categoria : Categoria = Object();

  constructor(private categoriaService: CategoriaService, private activatedRouter: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.categoriaService.detail(id).subscribe(
      data =>{
        this.categoria = data;
      }, err =>{
        alert("Error al traer la categoria");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.categoriaService.update(id, this.categoria).subscribe(
      data => {
        this.router.navigate(['/categorias']);
      }, err =>{
        alert("Error al modificar la categoria");
        this.router.navigate(['']);
      }
    )
  }

}
