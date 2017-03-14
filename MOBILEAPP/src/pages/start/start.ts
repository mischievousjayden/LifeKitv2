import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';
import {UserService} from "../../shared/services/user.service";
import {Dialogs} from 'ionic-native'

@Component({
  templateUrl: 'start.html'
})

export class Start {
  constructor(public userService:UserService, public alerCtrl: AlertController, public navCtrl: NavController) {
    setTimeout(() => {
      this.goNextPage();
    }, 3000);
  }

  goNextPage(){
    if(this.userService.isRegistered()){
      //if they already have a refresh token why do they ever need one again? Go to the home page! but have to get an access token
      this.userService.signin();
      this.navCtrl.setRoot('home');
    }else{
      this.navCtrl.setRoot('signuppage');
    }
  }

}
