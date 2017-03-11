import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';

@Component({
    templateUrl: 'verification.html'
})

export class VerificationPage {
    veriCode: String;
    login:{username?:string, password?:string} = {};
    submitted = false;
    modelOk = false;


    onLogin(form:NgForm) {
        this.submitted = true;

        if (form.valid) {
            //this.userData.login(this.login.username);
            //this.navCtrl.push(Dashboard);
        }
    }

    constructor(public alerCtrl: AlertController, public navCtrl: NavController) {


    }

    clickSendVeriCode(veriCode:String){
      //Do that post and get thing and then epending on the promised response then do the following
      //for now we are just going to go to the next page on a success....
      //GET BAKC IF THE PERSON IS A NALOXONE CARRIER OR A PATIENT then figure out which to set as root.
      this.navCtrl.setRoot('home');
    }
}
