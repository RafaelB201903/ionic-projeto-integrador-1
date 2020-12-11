import { AngularFireAuth } from '@angular/fire/auth';
import { ClienteService } from './../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  formGroup: FormGroup;
  perfil : Cliente = new Cliente();
  idUser = '';
  
  constructor(private formBuilder : FormBuilder, 
    private clienteServ : ClienteService,
    private auth : AngularFireAuth) {
    
      this.iniciarForm();
    
      this.auth.currentUser.then(response=>{
        this.clienteServ.buscaPerfilPorId(response.uid).subscribe(response=>{
          console.log(response);
          this.perfil = response;
          this.iniciarForm();
        })
      })

  }

  ngOnInit() {
  }

  
  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      nome: [this.perfil.nome],
      cpf: [this.perfil.cpf],
      endereco: [this.perfil.endereco],
      numero: [this.perfil.numero],
      cidade: [this.perfil.cidade],
      estado: [this.perfil.estado],
      email: [this.perfil.email],
      telefone: [this.perfil.telefone]
    })
  }

  atualizar(){
    
    this.auth.currentUser.then(response=>{
      this.clienteServ.atualizaPerfil(response.uid,this.formGroup.value).subscribe(response=>{
        console.log(response);
        console.log(this.formGroup.value  )
      })
    })
  }

}
