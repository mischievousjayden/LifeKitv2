import {Component} from "@angular/core";
import {Flashlight, Dialogs, Vibration, Geolocation, Geoposition} from "ionic-native";
import {App, NavController} from "ionic-angular";
import {Emergency} from "../emergency";
import {Observable} from "rxjs";
import {UserSettings} from "../../../shared/models/user-setting.model";
import {UserSettingsService} from "../../../shared/services/user-settings.service";
import {EmergenecyService} from "../../../shared/services/emergency.service";

@Component({
    templateUrl: 'request.html'
})
export class EmergencyRequest {
  //Time limit in seconds
  public static TIME_LIMIT = 2;
  public timer:Observable<any> = Observable.timer(0,1000);
  public timerOb:any;
  public currentTime:number = EmergencyRequest.TIME_LIMIT;
  public userSettings:UserSettings = new UserSettings();
    constructor(public er: EmergenecyService,public userSettingsService: UserSettingsService,public navCtrl:NavController, public app: App) {
      this.userSettings =userSettingsService.loadUserSettings();

      //flashlight
      Emergency.flashLight.flashLightIntervalID = setInterval(function(){
        Flashlight.toggle();
      },Emergency.flashLight.flashLightTime);

      //vibrate
      Emergency.vibrate.vibrateIntervalID = setInterval(function(){
        Vibration.vibrate(500);
      },Emergency.vibrate.vibrateTime);

      //Beep
      Dialogs.beep(1);

      app.viewWillUnload.subscribe(res=>{
        clearInterval(Emergency.flashLight.flashLightIntervalID);
        clearInterval(Emergency.vibrate.vibrateIntervalID);
        Flashlight.switchOff();
      });

      //Sends the emergency
      Geolocation.getCurrentPosition((geo:Geoposition)=>{
        er.startEmergency(this.userSettings.firstName + " " + this.userSettings.lastName, this.userSettings.addresses[0], geo).subscribe(res=>{
          console.log('Emergency request has been sent: ' + res);
        });
      });
    }

  ngOnInit(){
    //start the timer count
    console.log('ngoninit ran');
    this.timerOb=this.timer.subscribe(t=>{
      this.currentTime = this.currentTime - 1;
      if(this.currentTime==0){
        //stop the subscription and then.... start the next page with the alert.
        if(this.timerOb){
          this.timerOb.unsubscribe();
          //move to the next page
          this.navCtrl.push('elocator');
        }
      }
    });
  }

  cancelRequest(){
    if(this.timerOb){
      this.timerOb.unsubscribe();
    }
    this.er.endEmergency().subscribe(res=>{
      this.navCtrl.setRoot('home');
    });
  }
}
