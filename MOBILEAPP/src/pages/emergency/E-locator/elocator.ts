import {Component} from "@angular/core";
import {NavController, AlertController} from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

@Component({
  selector: 'e-locator',
  templateUrl: 'elocator.html'
})
export class Elocator {
  // toDO: implement method to get patient and naloxone locators

  locators = [{
    name: 'CVS',
    address : '1286 Chestnut, PA',
    phone: '+1 215-834-8222',
    hours: 'Open: 8AM-11PM'
  }, {
    name: 'Rite aids',
    address : '1633 Chestnut, PA',
    phone: '+1 215-987-2354',
    hours: 'Open: 8AM-10PM'
  }];


  patient = {
    name: 'Micheal Lex',
    address: '1011 Chestnut, Unit 1, PA',
    phone: '+1 215-232-5435'
  };

  // toDO: implement method to get current location

  currentLocation = 'Philadelphia, PA';


  // toDO: get timer from server?
  etimer = 123;

  constructor(public navCtrl: NavController, public alertCtrl : AlertController) {

  }

  call(phoneNumber) {
    phoneNumber = encodeURIComponent(phoneNumber);
    window.location.assign("tel:"+phoneNumber) ;

  }

  openMap(address){

    LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS).then(isAvailable =>{
      var app;
      if(isAvailable){
        app = LaunchNavigator.APP.GOOGLE_MAPS;
      }else{
        console.warn("Google Maps not available - falling back to user selection");
        app = LaunchNavigator.APP.USER_SELECT;
      }

      let options: LaunchNavigatorOptions =  {
        start: this.currentLocation,
        app: app
      }

      LaunchNavigator.navigate(address, options).then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    });

  }


  sendVerif() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Help Request',
      message: `Are you sure you want to cancel the patient request for help?`,
      buttons: [{
        text: 'Confirm' ,
        handler: () => {this.cancelRequest()}
      }, {
        text : 'Cancel',
        role: 'cancel'
      }]
    });
    alert.present();
  }

  // toDO : to cancel the whole emergency.
  cancelRequest() {

    this.navCtrl.setRoot('home');
  }


}
