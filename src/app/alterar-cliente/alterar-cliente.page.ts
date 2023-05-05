import { Cliente } from './../models/Cliente.model';
import { ClientesService } from './../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.page.html',
  styleUrls: ['./alterar-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarClientePage implements OnInit {
  id = 0;
  nome= '';
  email= '';
  senha= '';
  confirmaSenha= '';

  constructor(
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesService
  ) { }

  ngOnInit() {
    this.id = this.activeteRoute.snapshot.params['id'];

    this.clienteService.getOne(this.id).subscribe(retorno =>{
      this.nome = retorno.nome as string;
      this.email = retorno.email ? retorno.email : '';
    })
  }

  salvar(){

    if (this.senha === this.confirmaSenha) {
      const cliente: Cliente = {
        id: this.id,
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      };

      this.clienteService.update(cliente).subscribe(dados => {
        alert('Cliente alterado' + dados.id);
        // Aqui ele espera a resposta do servidor
        this.router.navigateByUrl('/home');
      });

      // Se colocar aqui, ele volta dando certo ou não
    } else {
      alert('Senhas não conferem!')
    }
  }
}

