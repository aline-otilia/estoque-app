import { Produto } from './../models/Produto.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  create(produto: Produto) : Observable<Produto> {
    return this.http.post<Produto>(this.url, produto).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );;
  }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getOne(id: number): Observable<Produto> {
    // this.http.get(this.url + '/' + id);
    return this.http.get<Produto>(`${this.url}/${id}`).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  update(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${produto.id}`, produto).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  login() {}

  logout() {}

  exibirErro(erro: any): Observable<any>{
    const titulo = 'Erro na Conexão!'
    const msg = `Verifique sua conexão ou informe ao suporte o erro: ${erro.status}`
    this.presentAlert(titulo, msg);
    return EMPTY;
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
