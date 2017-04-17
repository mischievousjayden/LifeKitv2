import {Component, Input} from "@angular/core";
import {NavController, AlertController, App, NavParams, Modal, ModalController} from 'ionic-angular';
import {LaunchNavigator, LaunchNavigatorOptions, Geolocation, Geoposition, GeolocationOptions} from 'ionic-native';
import {GooglePlaces} from "../../../shared/services/googleplaces.service";
import {GooglePlace} from "../../../shared/models/GooglePlace";
import {Observable} from "rxjs";
import {EmergencyService} from "../../../shared/services/emergency.service";
import {UserSettings, Address} from "../../../shared/models/user-setting.model";
import {UserSettingsService} from "../../../shared/services/user-settings.service";
import {Emergency} from "../../../shared/models/emergency.model";
import {Comment} from "../comment/comment";
import {EndScreen} from "../endscreen/endscreen";
@Component({
  selector: 'e-locator',
  templateUrl: 'elocator.html'
})
export class Elocator {

  // toDO: implement method to get patient and naloxone locators
  //Time limit in seconds
  public static TIME_LIMIT = 123;
  public timer: Observable<any> = Observable.timer(0, 1000);
  public timerOb: any;
  public currentTime: number = Elocator.TIME_LIMIT;

  public emergency:Emergency;
  locators: Array<GooglePlace> = new Array();


  patient = {
    name: 'Micheal Lex',
    address: '1011 Chestnut, Unit 1, PA',
    phone: '+1 215-232-5435'
  };

  // toDO: implement method to get current location

  currentLocation: Geoposition;
  public userSettings: UserSettings;

  // toDO: get timer from server?

  public static GPS_OPTIONS: GeolocationOptions = {maximumAge: 3000, timeout: 10000, enableHighAccuracy: true};
  constructor(public modal: ModalController, public params:NavParams,public googlePlaces: GooglePlaces, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.emergency = params.get('Emergency');
    Geolocation.getCurrentPosition(Elocator.GPS_OPTIONS).then(res => {
      var geoposition: Geoposition = res;

      //Get positions for the map
      googlePlaces.getGooglePlaces('pharmacy', geoposition, 1500, 3).subscribe(res => {
        console.log(res);
        this.locators = res;
      });
    }).catch(res => {
      console.log('error getting location');
    });
  }

  ngOnInit() {
    //start the timer count
    console.log('ngoninit ran');
    this.timerOb = this.timer.subscribe(t => {
      this.currentTime = this.currentTime - 1;
      if (this.currentTime == 0) {
        //stop the subscription and then.... start the next page with the alert.
        this.timerOb.unsubscribe();
      }
    });
  }

  call(phoneNumber) {
    phoneNumber = encodeURIComponent(phoneNumber);
    window.location.assign("tel:" + phoneNumber);

  }

  openMap(address) {
    LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS).then(isAvailable => {
      var app;
      if (isAvailable) {
        app = LaunchNavigator.APP.GOOGLE_MAPS;
      } else {
        console.warn("Google Maps not available - falling back to user selection");
        app = LaunchNavigator.APP.USER_SELECT;
      }

      Geolocation.getCurrentPosition(Elocator.GPS_OPTIONS).then(res => {
        var geoposition: Geoposition = res;
        var options = {
          start: geoposition.coords.latitude + "," + geoposition.coords.longitude,
          app: app
        };
        LaunchNavigator.navigate(address, options).then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
      });


    });
  }


  cancelHelp() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Help Request',
      message: `Are you sure you want to cancel the patient request for help?`,
      buttons: [{
        text: 'Confirm',
        handler: () => {
          //Nofunction in database to say you are not coming anymore....
          this.navCtrl.popToRoot();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',

      }]
    });
    alert.present();
  }
  saved(){
    let modal = this.modal.create(EndScreen,{
      emergencyId: this.emergency.emergencyid
    });
    modal.dismiss(res=>{
    }).then(()=>{
      this.navCtrl.setRoot('home');
    });
    modal.present();
  }
}

