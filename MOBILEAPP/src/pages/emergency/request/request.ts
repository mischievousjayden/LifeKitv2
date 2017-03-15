import {Component} from "@angular/core";
import {Flashlight, Vibration} from "ionic-native";
import {App} from "ionic-angular";
import {Emergency} from "../emergency";

@Component({
    templateUrl: 'request.html'
})
export class EmergencyRequest {
  public static flashLight = {
    flashLightTime: 1000,
    flashLightIntervalID:0
  };

  public static vibrate = {
    vibrateTime: 1000,
    vibrateIntervalID:0
  };
    constructor(public app: App) {
      //flashlight
      Emergency.flashLight.flashLightIntervalID = setInterval(function(){
        Flashlight.toggle();
      },Emergency.flashLight.flashLightTime);

      //vibrate
      Emergency.vibrate.vibrateIntervalID = setInterval(function(){
        Vibration.vibrate(500);
      },Emergency.vibrate.vibrateTime);

      app.viewWillUnload.subscribe(res=>{
        alert('view unloading');
        clearInterval(Emergency.flashLight.flashLightIntervalID);
        clearInterval(Emergency.vibrate.vibrateIntervalID);
      });
    }
}
