import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciclo } from '../models/Ciclo';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  private baseUrl = "http://localhost:3000/";
  constructor(private http: HttpClient) { 
  }
  listar(): Observable<Ciclo[]>{
    return this.http.get<Ciclo[]>(`${this.baseUrl}ciclo/listar`);
  }
  cadastrar(ciclo:Ciclo): Observable<Ciclo>{
    return this.http.post<Ciclo>(`${this.baseUrl}ciclo/cadastrar`,ciclo);
  }
  //recuperar o ID do Ciclo
  procurarCicloPorID(id: string): Observable<Ciclo>{
    return this.http.get<Ciclo>(`${this.baseUrl}ciclo/listar/${id}`);
  }
  //atualizar o Ciclo
  atualizarCiclo(ciclo: Ciclo): Observable<Ciclo>{
    //this.router.navigate(['ciclo/cadastrar',{id:ciclo._id}]);
    return this.http.put<Ciclo>(`${this.baseUrl}ciclo/alterar`,ciclo);
  }
  apagarCiclo(id: string): Observable<Ciclo[]>{
    return this.http.delete<Ciclo[]>(`${this.baseUrl}ciclo/excluir/${id}`);
  }
  recuperaDataMesAno(ano:number,mes:number): Observable<Ciclo>{
    return this.http.get<Ciclo>(`${this.baseUrl}${ano}/${mes}`);
  }
}
