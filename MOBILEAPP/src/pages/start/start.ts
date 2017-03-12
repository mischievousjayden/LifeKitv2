import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'start.html'
})

export class Start {
  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {
    setTimeout(() => {
      this.goNextPage();
    }, 3000);
  }

  goNextPage(){
    this.navCtrl.setRoot('signuppage');
  }

}
