import { CicloService } from "./../../../services/ciclo.service";
import { Ciclo } from "../../../models/Ciclo";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponent implements OnInit {
  ciclos!: MatTableDataSource<Ciclo>;
  displayedColumns: string[] = ['id', 'data', 'criadoEm','editar','apagar'];

  constructor(private service: CicloService,private router: Router,) {}

  ngOnInit(): void {
    this.service.listar().subscribe((ciclos) => {
      this.ciclos = new MatTableDataSource<Ciclo>(ciclos);
    });
  }
  
  apagarCiclo(id: string):void{
    this.service.apagarCiclo(id).subscribe((ciclo) =>{
      this.ciclos = new MatTableDataSource<Ciclo>(ciclo);
    });
    this.router.navigate([""]);
  }
  alterarCiclo(ciclo: Ciclo):void{
    this.router.navigate(['ciclo/cadastrar',{id:ciclo._id}]);
    // this.service.atualizarCiclo(ciclo).subscribe((lista) =>{
    //   this.cicloTemp.push(lista);
    //   this.ciclos = new MatTableDataSource<Ciclo>(this.cicloTemp);
    // });
  }
}
