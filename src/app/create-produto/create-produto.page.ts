import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Produto } from '../models/Produto.model';
import { ProdutosService } from '../services/produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-produto',
  templateUrl: './create-produto.page.html',
  styleUrls: ['./create-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateProdutoPage implements OnInit {
  titulo = '';
  descricao = '';
  preco = 0;
  nomeImagem = '';

  constructor(private produtoService: ProdutosService, private route: Router ) { }

  ngOnInit() {}

  adicionar(){
    
    const produto: Produto = {
      titulo: this.titulo,
      descricao: this.descricao,
      preco: this.preco,
      nome_imagem: this.nomeImagem,
    };

    this.produtoService.create(produto).subscribe(dados => {
      alert('Produto adicionado ' + dados.id);
      // Aqui ele espera a resposta do servidor
      this.route.navigateByUrl('/homep');
    });
  }
}
