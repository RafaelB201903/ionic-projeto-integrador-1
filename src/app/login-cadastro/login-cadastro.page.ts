import { TemplateService } from './../services/template.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
})
export class LoginCadastroPage implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(private auth : AngularFireAuth,
    private template : TemplateService,
    private navCtrl : NavController,) { }

  cadastro(){
    
    this.template.loading.then(load=>{
      load.present();
      this.auth.createUserWithEmailAndPassword(this.username.value, this.password.value).then(response=>{
        load.dismiss();
        this.template.myAlert("Cadastrado com sucesso");
        this.navCtrl.navigateForward(['/login'])
      }).catch(err=>{
        this.template.myAlert("Dados incorretos");
      })

    })

    
  }

  ngOnInit() {
  }

}
