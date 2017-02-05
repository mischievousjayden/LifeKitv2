import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {LoginService} from 'services/login.service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  
  }
}
