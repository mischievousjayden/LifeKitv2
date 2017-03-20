import {Component} from "@angular/core";
import {NavController, AlertController, App} from 'ionic-angular';
import {LaunchNavigator, LaunchNavigatorOptions, Geolocation, Geoposition, GeolocationOptions} from 'ionic-native';
import {GooglePlaces} from "../../../shared/services/googleplaces.service";
import {GooglePlace} from "../../../shared/models/GooglePlace";
import {Observable} from "rxjs";
import {EmergenecyService} from "../../../shared/services/emergency.service";
import {UserSettings, Address} from "../../../shared/models/user-setting.model";
import {UserSettingsService} from "../../../shared/services/user-settings.service";

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

  constructor(public googlePlaces: GooglePlaces, public navCtrl: NavController, public alertCtrl: AlertController) {
    Geolocation.getCurrentPosition(Elocator.GPS_OPTIONS).then(res => {
      var geoposition: Geoposition = res;
      //Get emergency services
      var sendAddr: Address;

      // toDo: implement a function to figure out which address to send is the most likely they will be there
      if (this.userSettings.addresses.length == 0) {
        sendAddr = null;
      } else {
        sendAddr = this.userSettings.addresses[0];
      }


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


  sendVerif() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Help Request',
      message: `Are you sure you want to cancel the patient request for help?`,
      buttons: [{
        text: 'Confirm',
        handler: () => {

        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    alert.present();
  }
}

