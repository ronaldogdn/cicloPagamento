import { Debito } from '../../../models/Debito';
import { MatTableDataSource } from "@angular/material/table";
import { CicloService } from "./../../../services/ciclo.service";
import { Ciclo } from "../../../models/Ciclo";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Credito } from "../../../models/Credito";

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.component.html",
  styleUrls: ["./cadastrar.component.css"],
})
export class CadastrarComponent implements OnInit {
  colunasCredito = ["nome", "valor", "editar"];
  colunasDebito = ["nome", "valor", "status", "editar"];

  alterar: boolean = false;
  cicloTemp: Ciclo = new Ciclo();

  data!: string;

  idCredito!: string;
  nomeCredito!: string;
  valorCredito!: string;
  creditos = new MatTableDataSource<Credito>();

  nomeDebito!: string;
  valorDebito!: string;
  statusDebito!: string;
  debitos = new MatTableDataSource<Debito>();

  constructor(private service: CicloService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.alterar = true;
      this.service.procurarCicloPorID(id).subscribe((ciclo) => {
        this.cicloTemp = ciclo;
        this.carregaDados(ciclo, new Date(ciclo.data));
      });
    }
  }
  alterarCredito(credito: Credito): void {
    this.idCredito = credito._id;
    this.alterar = true;
    this.nomeCredito = credito.nome;
    this.valorCredito = credito.valor.toString();
  }
  alterarDebito(debito: Debito): void {
    this.alterar = true;
    this.nomeDebito = debito.nome;
    this.valorDebito = debito.valor.toString();
    this.statusDebito = debito.status;
  }
  carregaDados(ciclo: Ciclo, dataTemp: Date): void {
    let ano = dataTemp.getFullYear().toString();
    let mesTemp = dataTemp.getMonth();
    let diaTemp = dataTemp.getDay();

    let mes = mesTemp > 9 ? mesTemp.toString() : "0" + mesTemp.toString();
    let dia = diaTemp > 9 ? diaTemp.toString() : "0" + diaTemp.toString();
    this.data = ano + "/" + mes + "/" + dia;

    this.creditos = new MatTableDataSource<Credito>(ciclo.creditos);
    this.debitos = new MatTableDataSource<Debito>(ciclo.debitos);
  }

  cadastrar(): void {
    this.alterar = false;
    let ciclo = new Ciclo();
    ciclo.data = new Date(this.data);
    ciclo.creditos = this.creditos.data;
    ciclo.debitos = this.debitos.data;

    this.service.cadastrar(ciclo).subscribe(ciclo => {
      this.snack.open("Ciclo de pagamento cadastrado", "Ciclo", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate([""]);
    });
  }

  atualizarCredito(){
    this.cicloTemp.creditos.forEach(credito =>{
      if(credito._id === this.idCredito){
        credito.nome = this.nomeCredito;
        credito.valor = Number.parseInt(this.valorCredito);
        return;
      }
    });
    let retorno = this.service.atualizarCiclo(this.cicloTemp)
      .subscribe(ciclo => {
        // console.log(ciclo);
          this.snack.open("Ciclo de pagamento atualizado", "Ciclo", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          }
      );
      //console.log(retorno);
      this.creditos = new MatTableDataSource<Credito>(this.cicloTemp.creditos);
      //this.creditos._updateChangeSubscription();
      //this.router.navigate([""]);
    });

  }

  adicionarCredito(): void {
    let credito = new Credito();
    credito.nome = this.nomeCredito;
    credito.valor = Number.parseInt(this.valorCredito);
    this.creditos.data.push(credito);
    this.creditos._updateChangeSubscription();
    this.nomeCredito = "";
    this.valorCredito = "";
  }

  adicionarDebito(): void {
    let debito = new Debito();
    debito.nome = this.nomeDebito;
    debito.valor = this.valorDebito;
    debito.status = this.statusDebito;
    this.debitos.data.push(debito);
    //verifica se tem alguma atualização e renderiza de novo
    this.debitos._updateChangeSubscription();
    this.nomeDebito = "";
    this.valorDebito = "";
    this.statusDebito = "";
  }
}
