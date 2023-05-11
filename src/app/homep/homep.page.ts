import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProdutosService } from './../services/produtos.service';
import { Produto } from '../models/Produto.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-homep',
  templateUrl: './homep.page.html',
  styleUrls: ['./homep.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class HomepPage {

  listaProdutos: Produto[]=[];


  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  ionViewWillEnter(): void {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.produtosService.getAll().subscribe((dados) => {
      this.listaProdutos = dados;
    });
  }
  alterarProduto(id: number) {
    this.router.navigateByUrl(`/alterar-produto/${id}`);
  }

  excluirProduto(id: number) {

  }

}
