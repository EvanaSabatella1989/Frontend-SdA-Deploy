import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  
  miCat:any;

constructor(private cat: CategoriaService, private activatedRoute: ActivatedRoute, private router: Router) {
    
   }

  ngOnInit(): void {
    this.cat.obtenerCategorias().subscribe({
      next:(categoriasTodas)=>{
        this.miCat=categoriasTodas;
        console.log(" Exito se cargo las categorías");
      },
      error:(errorData)=> {
        console.log("error del componenete categoría ");
        console.error(errorData);
        this.router.navigate(['']);
      }
    })
  

   


  }

  delete(item:any){
    this.miCat.forEach((categoria: any) => {
          if (categoria.id == item.id) {
            this.cat.delete(item.id).subscribe(
                res=>this.cat.obtenerCategorias().subscribe(
                Response=>this.miCat=Response
                )
            );
            console.log('borre la categoria numero :'+item.id);
          }
        });
  }

  

}
