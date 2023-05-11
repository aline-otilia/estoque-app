import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdutosService } from '../services/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/Produto.model';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarProdutoPage implements OnInit {
  id = 0;
  titulo= '';
  descricao= '';
  preco= 0;
  nomeImagem= '';

  constructor(
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutosService

  ) { }

  ngOnInit() {
    this.id = this.activeteRoute.snapshot.params['id'];

    this.produtoService.getOne(this.id).subscribe(retorno =>{
      this.titulo = retorno.titulo as string;
      this.descricao = retorno.descricao as string;
      this.preco = retorno.preco as number;
      this.nomeImagem = retorno.nome_imagem as string;
    })
  }

  alterar(){

    const produto: Produto = {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      preco: this.preco,
      nome_imagem: this.nomeImagem,
    };

    this.produtoService.update(produto).subscribe(dados => {
      alert('Produto alterado ' + dados.id);
      // Aqui ele espera a resposta do servidor
      this.router.navigateByUrl('/homep');
    });
  }
}
