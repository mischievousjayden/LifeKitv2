import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginService } from './services/login.service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  constructor(public navCtrl: NavController, public lS: LoginService ) {
  
  }
  
  message(){
	console.log(this.lS.login('he','he'));
  }
}
