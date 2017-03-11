import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';

@Component({
    templateUrl: 'signup.html'
})

export class SignUpPage {
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

    activateButton() {
        this.modelOk = (this.login.username && this.login.password) ? true : false;
        ;
        }

    constructor(public alerCtrl: AlertController, public navCtrl: NavController) { }

    sendVerif(){
        let alert = this.alerCtrl.create({
        title: 'Phone Number Accepted!',
        message: 'Please enter the verification code sent to you to continue.',
        buttons: [{
            text: 'Ok',
            handler: () => this.nextPage()}]});
        alert.present();
        }

    nextPage(){
      this.navCtrl.push('verificationpage');
    }
}
