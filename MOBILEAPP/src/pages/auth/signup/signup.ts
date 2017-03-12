import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';
import {ApiService} from "../../../shared/services/api.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
    templateUrl: 'signup.html'
})

export class SignUpPage {
    login:{username?:string, password?:string} = {};
    submitted = false;
    modelOk = false;
    phoneNumber: number;


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

    constructor(public userService:UserService, public alerCtrl: AlertController, public navCtrl: NavController) { }

    sendVerif(){
        let alert = this.alerCtrl.create({
        title: 'Phone Number Accepted!',
        message: 'Please enter the verification code sent to you to continue.',
        buttons: [{
            text: 'Ok' + this.phoneNumber,
            handler: () => {
              this.userService.signup(this.phoneNumber.toString()).subscribe(res =>{
                console.log("verification code" + res);
                this.nextPage();
              });
            }}]});
        alert.present();
        }

    nextPage(){
      this.navCtrl.push('verificationpage');
    }
}
