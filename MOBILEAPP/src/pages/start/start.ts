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
      this.goNextPageAuth();
    }, 3000);
  }

  goNextPageAuth(){
    if(this.userService.isRegistered()){
      //if they already have a refresh token why do they ever need one again? Go to the home page! but have to get an access token
      var res = this.userService.signin().subscribe(res=>{
        console.log("sign in access token: " + res.result);
        if(res){
          this.navCtrl.setRoot('home');
        }else{
          this.navCtrl.setRoot('signuppage');
        }
      });

    }else{
      this.navCtrl.setRoot('signuppage');
    }
  }
  goNextPage(){
    if(this.userService.isRegistered()) {
      this.navCtrl.setRoot('home');
    }
  }

}
