import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cliente } from '../models/Cliente.model';
import { ClientesService } from '../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.page.html',
  styleUrls: ['./create-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateClientePage implements OnInit {
  nome = '';
  email = '';
  senha = '';
  confirmaSenha = '';
  
  constructor(private clienteService: ClientesService, private route: Router) {}

  ngOnInit() {}

  salvar(){

    if (this.senha === this.confirmaSenha) {
      const cliente: Cliente = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      };

      this.clienteService.create(cliente).subscribe(dados => {
        alert('Cliente inserido' + dados.id);
        // Aqui ele espera a resposta do servidor
        this.route.navigateByUrl('/home');
      });

      // Se colocar aqui, ele volta dando certo ou não
    } else {
      alert('Senhas não conferem!')
    }
  }
}
