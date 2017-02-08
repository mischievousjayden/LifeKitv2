import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginService } from './services/login.service';
import { User } from '../../objects/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class LoginPage {
  user : User = {
		userName :"",
		passWord : ""
	}
	
  constructor(public navCtrl: NavController, public lS: LoginService ) {
	
  }
  
  goLogin(){
	console.log((this.lS.login(this.user.userName,this.user.passWord)));
  }
}

