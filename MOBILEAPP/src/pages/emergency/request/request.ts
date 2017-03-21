import {Component} from "@angular/core";
import {Flashlight, Dialogs, Vibration, Geolocation, Geoposition} from "ionic-native";
import {App, NavController} from "ionic-angular";
import {Emergency} from "../emergency";
import {Observable, TimeInterval} from "rxjs";
import {UserSettings, Address} from "../../../shared/models/user-setting.model";
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
  public beepingOb:any;
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
      this.beepingOb = setInterval(function(){
        Dialogs.beep(1);
      },1000);

      app.viewWillUnload.subscribe(res=>{
        clearInterval(Emergency.flashLight.flashLightIntervalID);
        clearInterval(Emergency.vibrate.vibrateIntervalID);
        Flashlight.switchOff();
        clearInterval(this.beepingOb);
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
          //Do the emergency call
          //Sends the emergency
          console.log('about to get position to send emergencyt request');
          Geolocation.getCurrentPosition().then((geo:Geoposition)=>{
            var sendAddr: Address;
            console.log("about to send emergency requestion");
            // toDo: implement a function to figure out which address to send is the most likely they will be there
            if (this.userSettings.addresses.length == 0) {
              sendAddr = new Address();
            } else {
              sendAddr = this.userSettings.addresses[0];
            }
            this.er.startEmergency(this.userSettings.firstName + " " + this.userSettings.lastName,sendAddr, geo).subscribe(res=>{
              console.log('Emergency Request Has been Sent!')
            });
          });
        }
      }
    });
  }

  cancelRequest(){
    if(this.timerOb) {
      this.timerOb.unsubscribe();
    }
    this.er.endEmergency().subscribe(res=>{
      this.navCtrl.setRoot('home');
    });
  }
}
